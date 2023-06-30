import { mount } from 'cypress/vue2';
import Component from './component.vue';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { COMPONENT_NAME, dtPartnersParams } from './attributes';
import { PartnersParamsDisplay } from './component';
import { fakeLastBranchPartner } from '~/shared/repository/fixtures/fake-last-branch-partner';
import { PartnersParamsComponent } from './index';

describe(COMPONENT_NAME, () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('обычное состояние', () => {
    page.assertContentBehaviourIsCorrect();
    page.assertSponsorFioBehaviourIsCorrect();
  });

  it('без информации о спонсоре', () => {
    page = create({ hasSponsorFio: false });

    page.assertContentBehaviourIsCorrect();
    page.sponsorFio.should('not.exist');
  });

  it(`состояние display: ${PartnersParamsDisplay.column}`, () => {
    page = create({ display: PartnersParamsDisplay.column });

    page.assertContentBehaviourIsCorrect();
    page.assertSponsorFioBehaviourIsCorrect();
  });

  it(`состояние display: ${PartnersParamsDisplay.row}`, () => {
    page = create({ display: PartnersParamsDisplay.row });

    page.assertContentBehaviourIsCorrect();
    page.sponsorFio.should('not.exist');
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersParams.block);
  }

  get content() {
    return cy.get(dtPartnersParams.content);
  }

  get login() {
    return cy.get(dtPartnersParams.login);
  }

  get fio() {
    return cy.get(dtPartnersParams.fio);
  }

  get goStatus() {
    return cy.get(dtPartnersParams.goStatus);
  }

  get rank() {
    return cy.get(dtPartnersParams.rank);
  }

  get sponsorFio() {
    return cy.get(dtPartnersParams.sponsorFio);
  }

  get vueWrapper() {
    return Cypress.vueWrapper;
  }

  get actualComponent(): PartnersParamsComponent {
    return this.vueWrapper.findComponent(Component).vm as PartnersParamsComponent;
  }

  get displayedLogin(): number {
    return this.actualComponent.displayedLogin;
  }

  get displayedGoStatus(): string {
    return this.actualComponent.displayedGoStatus;
  }

  get displayedRankTitle(): string {
    return this.actualComponent.displayedRankTitle;
  }

  get displayedFio(): string {
    return this.actualComponent.displayedFio;
  }

  get isRowDisplay(): boolean {
    return this.actualComponent.isRowDisplay;
  }

  assertContentBehaviourIsCorrect(): void {
    this.content
      .should('be.visible')
      .within(() => {
        this.login.should('be.visible').contains(this.displayedLogin);
        this.goStatus.should('be.visible').contains(this.displayedGoStatus);

        this.isRowDisplay
          ? this.fio.should('be.visible').contains(this.displayedFio)
          : this.fio.should('not.exist');
        !this.isRowDisplay
          ? this.rank.should('be.visible').contains(this.displayedRankTitle)
          : this.rank.should('not.exist');
      });
  }

  assertSponsorFioBehaviourIsCorrect(): void {
    this.sponsorFio.should('be.visible').contains(this.displayedFio);
  }
}

function create(props = {}) {
  clearCyRoot();

  mount(Component, {
    propsData: {
      partnerData: fakeLastBranchPartner(),
      hasSponsorFio: true,
      display: PartnersParamsDisplay.column,
      ...props
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
