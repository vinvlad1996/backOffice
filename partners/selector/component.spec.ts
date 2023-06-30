import { mount } from 'cypress/vue2';
import { Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Component from './component.vue';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import { getComponentName } from '~/shared/utils/unit-test/get-component-name';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { dtPartnersSelector } from './attributes';
import { fakeLastBranchPartner } from '~/shared/repository/fixtures/fake-last-branch-partner';
import { PartnersSelectorComponent } from './index';
import { dtPartnersTree } from '../tree/attributes';
import { RoutesName } from '~/shared/repository/routes/routes-name';
import { fakePartnersBranchRegular } from '~/shared/repository/fixtures/partners';

const { startPartner } = fakePartnersBranchRegular();

describe(getComponentName(Component), () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('radio-кнопка отображается', () => {
    page.assertUiRadioButtonBehaviourIsCorrect();
  });

  it('логин отображается и содержит валидные данные', () => {
    page.assertLoginBehaviourIsCorrect();
  });

  it('go-статус отображается и содержит валидные данные', () => {
    page.assertGoStatusBehaviourIsCorrect();
  });

  it('ранк отображается и содержит валидные данные', () => {
    page.assertRankTitleBehaviourIsCorrect();
  });

  it('данные партнера отображаются и содержат валидные данные', () => {
    page.fio
      .should('be.visible')
      .contains(startPartner.firstName)
      .contains(startPartner.lastName);
  });

  it('список веток не отображается', () => {
    page.partnersTree.should('not.exist');
  });

  it('кнопка привязки партнера не отображается', () => {
    page.button.should('not.exist');
  });

  it('если партнер выбран, отображаются валидные данные', () => {
    page = create(startPartner.login);

    page.assertLoginBehaviourIsCorrect();
    page.assertGoStatusBehaviourIsCorrect();
    page.assertUiRadioButtonBehaviourIsCorrect();
    page.assertRankTitleBehaviourIsCorrect();

    page.fio.should('not.exist');

    page.partnersTree.should('be.visible');
    page.button
      .should('be.visible')
      .contains(page.displayedButtonText);
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersSelector.block);
  }

  get login() {
    return cy.get(dtPartnersSelector.login);
  }

  get goStatus() {
    return cy.get(dtPartnersSelector.goStatus);
  }

  get rankTitle() {
    return cy.get(dtPartnersSelector.rankTitle);
  }

  get button() {
    return cy.get(dtPartnersSelector.button);
  }

  get fio() {
    return cy.get(dtPartnersSelector.fio);
  }

  get uiRadioButton() {
    return cy.get(dtPartnersSelector.uiRadioButton);
  }

  get partnersTree() {
    return cy.get(dtPartnersTree.block);
  }

  get vueWrapper(): Wrapper<Vue> {
    return Cypress.vueWrapper;
  }

  get actualComponent(): PartnersSelectorComponent {
    return this.vueWrapper.findComponent(Component).vm as PartnersSelectorComponent;
  }

  get displayedGoStatus(): string {
    return this.actualComponent.displayedGoStatus;
  }

  get displayedRankTitle(): string {
    return this.actualComponent.displayedRankTitle;
  }

  get displayedButtonText(): string {
    return this.actualComponent.displayedButtonText;
  }

  assertUiRadioButtonBehaviourIsCorrect(): void {
    this.uiRadioButton.should('be.visible');
  }

  assertLoginBehaviourIsCorrect(): void {
    this.login
      .should('be.visible')
      .contains(startPartner.login);
  }

  assertGoStatusBehaviourIsCorrect(): void {
    this.goStatus
      .should('be.visible')
      .contains(this.displayedGoStatus);
  }

  assertRankTitleBehaviourIsCorrect(): void {
    this.rankTitle
      .should('be.visible')
      .contains(this.displayedRankTitle);
  }
}

function create(partnerLogin = null) {
  clearCyRoot();

  mount(Component, {
    propsData: {
      partnerLogin,
      partnerData: fakeLastBranchPartner(),
      partnerName: `${startPartner.firstName} ${startPartner.lastName}`
    },
    mocks: {
      $route: {
        name: RoutesName.index,
        params: {
          number: null
        }
      }
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
