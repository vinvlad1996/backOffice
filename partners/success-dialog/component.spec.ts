import { mount } from 'cypress/vue2';
import Component from './component.vue';
import { getComponentName } from '~/shared/utils/unit-test/get-component-name';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import { SuccessDialogEvent } from './component';
import { PartnersSuccessDialogTextAttribute, dtPartnersSuccessDialog } from './attribute';
import { fakeBranchInfo } from '~/shared/repository/fixtures/fake-branch-info';
import { assertEventEmitted } from '~/shared/utils/unit-test/assertions';

describe(getComponentName(Component), () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('картинка отображается и содержит валидный src', () => {
    page.picture
      .should('be.visible')
      .should('have.attr', 'src');
  });

  it('описание отображается с валидным текстом', () => {
    page.description
      .should('be.visible')
      .contains(PartnersSuccessDialogTextAttribute.description);
  });

  it('кнопка "закрыть" отображается с валидным текстом', () => {
    page.closeButton
      .should('be.visible')
      .contains(PartnersSuccessDialogTextAttribute.closeButton);
  });

  it(`по клику кнопка эмитит событие ${SuccessDialogEvent.close}`, () => {
    page.closeButton
      .click()
      .then(() => {
        assertEventEmitted(SuccessDialogEvent.close);
      });
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersSuccessDialog.block);
  }

  get picture() {
    return cy.get(dtPartnersSuccessDialog.picture);
  }

  get description() {
    return cy.get(dtPartnersSuccessDialog.description);
  }

  get closeButton() {
    return cy.get(dtPartnersSuccessDialog.closeButton);
  }
}

function create() {
  clearCyRoot();

  mount(Component, {
    propsData: {
      isVisible: true,
      branchInfo: fakeBranchInfo()
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
