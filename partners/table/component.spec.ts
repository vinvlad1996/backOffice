import { mount } from 'cypress/vue2';
import { Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { getComponentName } from '~/shared/utils/unit-test/get-component-name';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import Component from './component.vue';
import { PartnersTableTextAttribute, dtPartnersTable } from './attributes';
import { fakeAvailableBranchesListWithoutPartnersResponse, fakeAvailableBranchesListResponse, fakeAvailableBranchesListOfFirstBranchResponse } from '~/shared/repository/fixtures/fake-available-branches-list';
import { PartnersTableComponent } from './index';
import {
  PartnersTableColumnWidth,
  DEFAULT_COLUMN_START_INDEX_WITH_PARTNER,
  DEFAULT_COLUMN_START_INDEX, PLACEHOLDER_TEXT,
  PartnersTableParams,
  PartnersTableData,
  QUANTITY_ROWS,
  PartnersTableItemView,
  PartnersTableRow
} from './component';
import { UiButtonView } from '~/components/ui/button/component';
import { PartnersBranchForAvailable } from '../model';
import { EXTERNAL_CURRENCY } from '~/static-data/common-text-attributes';

const DEFAULT_COLUMN_INDEX = 0;

describe(getComponentName(Component), () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('таблица отображается', () => {
    page.elTable.should('be.visible');
  });

  it('отображается валидное кол-во колонок', () => {
    page.elTableColumns.should('have.length', page.quantityOfBranchesWithInitalColumn);
  });

  it('каждая кнопка отображается и содержит валидный текст', () => {
    page.buttons.each(($item) => {
      const wrappedItem = cy.wrap($item);

      wrappedItem
        .should('be.visible')
        .contains(PartnersTableTextAttribute.select);
    });
  });

  it('таблица отображает валидные данные', () => {
    let startIndex = 0;

    for (let index = 0; index < page.tableData.length; index++) {
      const currentRow = page.tableData[index];

      for (let columnIndex = 0; columnIndex < Object.keys(currentRow).length; columnIndex++) {
        const currentValue = currentRow[page.currentKey(columnIndex + DEFAULT_COLUMN_START_INDEX)];

        if (page.isButtonView(currentValue.view)) {
          page.buttons
            .eq(columnIndex - DEFAULT_COLUMN_START_INDEX)
            .should('be.visible')
            .contains(PartnersTableTextAttribute.select);
        }

        if (currentValue.text && !page.isButtonView(currentValue.view)) {
          page.texts.eq(startIndex).should('be.visible').contains(currentValue.text);
        }

        startIndex += 1;
      }
    }
  });

  describe('метод для получения текущего размера колонки', () => {
    it(`возвращает ${PartnersTableColumnWidth.extra}, если ${DEFAULT_COLUMN_START_INDEX_WITH_PARTNER} партнера`, () => {
      expect(page.currentColumnWidth(DEFAULT_COLUMN_INDEX)).to.equal(PartnersTableColumnWidth.extra);
    });
  });

  describe('метод для получения текущего размера колонки', () => {
    beforeEach(() => {
      page = create(fakeAvailableBranchesListResponse().branches);
    });

    it(`возвращает ${PartnersTableColumnWidth.default},
        если больше ${DEFAULT_COLUMN_START_INDEX_WITH_PARTNER} партнеров
        и передан index первой колонки
    `, () => {
      expect(page.currentColumnWidth(DEFAULT_COLUMN_START_INDEX)).to.equal(PartnersTableColumnWidth.default);
    });

    it(`возвращает ${PartnersTableColumnWidth.regular},
        если больше ${DEFAULT_COLUMN_START_INDEX_WITH_PARTNER} партнеров
        и передан index любой колонки, кроме первой
    `, () => {
      expect(page.currentColumnWidth(DEFAULT_COLUMN_START_INDEX + 1)).to.equal(PartnersTableColumnWidth.regular);
    });
  });

  describe('метод возвращающий текущий view кнопки', () => {
    it(`возвращает ${UiButtonView.action}, если все ветки пустые и это первая колонка партнера`, () => {
      expect(page.currentButtonView(DEFAULT_COLUMN_START_INDEX_WITH_PARTNER)).to.equal(UiButtonView.action);
    });

    it(`возвращает ${UiButtonView.extra}, если все ветки пустые и это не первая колонка партнера`, () => {
      expect(page.currentButtonView(DEFAULT_COLUMN_START_INDEX_WITH_PARTNER + 1)).to.equal(UiButtonView.extra);
    });
  });

  describe('метод возвращающий текущий view кнопки', () => {
    beforeEach(() => {
      page = create(fakeAvailableBranchesListOfFirstBranchResponse().branches);
    });

    it(`возвращает ${UiButtonView.extra}, если 1 ветка заполнена и это первая колонка партнера`, () => {
      expect(page.currentButtonView(DEFAULT_COLUMN_START_INDEX_WITH_PARTNER)).to.equal(UiButtonView.extra);
    });

    it(`возвращает ${UiButtonView.action}, если 1 ветка заполнена и это не первая колонка партнера`, () => {
      expect(page.currentButtonView(DEFAULT_COLUMN_START_INDEX_WITH_PARTNER + 1)).to.equal(UiButtonView.action);
    });
  });

  describe('метод возвращающий текущий restPV', () => {
    it(`возвращает ${PLACEHOLDER_TEXT}, если все ветки пустые`, () => {
      expect(page.currentSavedVolumeForTableItem(null, true, DEFAULT_COLUMN_START_INDEX)).to.equal(PLACEHOLDER_TEXT);
    });
  });

  describe('метод возвращающий текущий restPV', () => {
    const branchItem = fakeAvailableBranchesListOfFirstBranchResponse().branches[0];

    beforeEach(() => {
      page = create([branchItem]);
    });

    it('возвращает валидные данные об активности, если ветка не пустая и это не первая колонка партнера', () => {
      expect(page.currentSavedVolumeForTableItem(branchItem, false, DEFAULT_COLUMN_START_INDEX_WITH_PARTNER))
        .to.contain(`${branchItem.savedVolume.value} ${EXTERNAL_CURRENCY}`);
    });

    it(`возвращает ${PLACEHOLDER_TEXT}, если ветка пустая`, () => {
      expect(page.currentSavedVolumeForTableItem(branchItem, true, branchItem.number)).to.equal(PLACEHOLDER_TEXT);
    });
  });

  describe('метод проверяющий зафиксирована первая колонка или нет', () => {
    it(`не зафиксирована, если всего ${DEFAULT_COLUMN_START_INDEX_WITH_PARTNER} партнера`, () => {
      expect(page.isColumnFixed(DEFAULT_COLUMN_START_INDEX)).to.equal(false);
    });
  });

  describe('метод проверяющий зафиксирована первая колонка или нет', () => {
    beforeEach(() => {
      page = create(fakeAvailableBranchesListResponse().branches);
    });

    it(`зафиксирована, если больше ${DEFAULT_COLUMN_START_INDEX_WITH_PARTNER} партнеров`, () => {
      expect(page.isColumnFixed(DEFAULT_COLUMN_START_INDEX)).to.equal(true);
    });

    it(`
      любая другая колонка не зафиксирована, если больше ${DEFAULT_COLUMN_START_INDEX_WITH_PARTNER} партнеров
    `, () => {
      expect(page.isColumnFixed(DEFAULT_COLUMN_START_INDEX_WITH_PARTNER)).to.equal(false);
    });
  });

  describe('метод возвращающий параметры для текущей колонки', () => {
    it('возвращает дефолтные значения, если не переданы параметры', () => {
      const expectedValue = { [page.currentKey(DEFAULT_COLUMN_START_INDEX)]: page.initialTableItemParams };

      expect(page.getParamsForCurrentTableItem()).to.deep.eq(expectedValue);
    });

    it('возвращает верные данные, если передать некоторые параметры', () => {
      const textValue = 'Test';
      const expectedValue = {
        [page.currentKey(DEFAULT_COLUMN_START_INDEX)]: { ...page.initialTableItemParams, text: textValue }
      };

      expect(page.getParamsForCurrentTableItem({ text: textValue })).to.deep.eq(expectedValue);
    });
  });

  describe('метод формирования данных для таблицы', () => {
    it('возвращает валидное кол-во строк в таблице', () => {
      expect(page.tableData.length).to.equal(QUANTITY_ROWS);
    });
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersTable.block);
  }

  get elTable() {
    return cy.get(dtPartnersTable.elTable);
  }

  get elTableColumns() {
    return cy.get(dtPartnersTable.elTableColumn);
  }

  get buttons() {
    return cy.get(dtPartnersTable.button);
  }

  get texts() {
    return cy.get(dtPartnersTable.text);
  }

  get vueWrapper(): Wrapper<Vue> {
    return Cypress.vueWrapper;
  }

  get actualComponent(): PartnersTableComponent {
    return this.vueWrapper.findComponent(Component).vm as PartnersTableComponent;
  }

  get quantityOfBranchesWithInitalColumn(): number {
    return this.actualComponent.quantityOfBranchesWithInitalColumn;
  }

  get initialTableItemParams(): PartnersTableParams {
    return this.actualComponent.initialTableItemParams;
  }

  get tableData(): PartnersTableData[] {
    return this.actualComponent.tableData;
  }

  currentColumnWidth(index: number): string {
    return this.actualComponent.currentColumnWidth(index);
  }

  currentButtonView(index: number): UiButtonView {
    return this.actualComponent.currentButtonView(index);
  }

  currentSavedVolumeForTableItem(
    item: PartnersBranchForAvailable, isCurrentBranchEmpty: boolean, index: number
  ): string {
    return this.actualComponent.currentSavedVolumeForTableItem(item, isCurrentBranchEmpty, index);
  }

  isColumnFixed(index: number): boolean {
    return this.actualComponent.isColumnFixed(index);
  }

  getParamsForCurrentTableItem(
    params: Partial<PartnersTableParams> = {}, index = DEFAULT_COLUMN_START_INDEX
  ): PartnersTableRow {
    return this.actualComponent.getParamsForCurrentTableItem(params, index);
  }

  currentKey(index: number): string {
    return this.actualComponent.currentKey(index);
  }

  isButtonView(view: PartnersTableItemView): boolean {
    return this.actualComponent.isButtonView(view);
  }
}

function create(branches = fakeAvailableBranchesListWithoutPartnersResponse().branches) {
  clearCyRoot();

  mount(Component, {
    propsData: {
      branches
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
