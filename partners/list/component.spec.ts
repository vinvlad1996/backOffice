import { mount } from 'cypress/vue2';
import { Route } from 'vue-router';
import { Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Component from './component.vue';
import { getComponentName } from '~/shared/utils/unit-test/get-component-name';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import { dtPartnersList, PartnersListTextAttribute } from './attributes';
import { fakeForLinkingPartnersList } from '~/shared/repository/fixtures/fake-for-linking-partners';
import { PartnersListComponent } from '.';
import { PartnersCandidateForLinking } from '../model';

const candidates = fakeForLinkingPartnersList();

describe(getComponentName(Component), () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('список отображается и содержит валидный текст', () => {
    page.list.should('be.visible');
  });

  it('отображается валидное кол-во элементов', () => {
    page.items.should('have.length', candidates.length);
  });

  it('каждый элемент отображается и содержит валидные данные', () => {
    page.items.each(($item, $index) => {
      const wrappedItem = cy.wrap($item);
      const { activationDate, firstName, goStatus, pv } = page.sortedCandidates[$index];

      wrappedItem
        .should('be.visible')
        .within(() => {
          page.date
            .should('be.visible')
            .contains(PartnersListTextAttribute.activation)
            .contains(page.displayedActivationDate(activationDate));

          page.name
            .should('be.visible')
            .contains(firstName);

          page.status
            .should('be.visible')
            .contains(goStatus);

          page.size
            .should('be.visible')
            .contains(pv);
        });
    });
  });

  it('ссылка отображается и по ней осуществляется переход', () => {
    page.list
      .should('be.visible')
      .invoke('prop', 'to', page.invitePartnerRoute);
  });

  it('кнопка отображается и содержит валидный текст', () => {
    page.attachButton
      .should('be.visible')
      .contains(PartnersListTextAttribute.attach);
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersList.block);
  }

  get list() {
    return cy.get(dtPartnersList.list);
  }

  get items() {
    return cy.get(dtPartnersList.items);
  }

  get date() {
    return cy.get(dtPartnersList.date);
  }

  get name() {
    return cy.get(dtPartnersList.name);
  }

  get sectionTitle() {
    return cy.get(dtPartnersList.title);
  }

  get status() {
    return cy.get(dtPartnersList.status);
  }

  get size() {
    return cy.get(dtPartnersList.size);
  }

  get sortedCandidates(): PartnersCandidateForLinking[] {
    return this.actualComponent.sortedCandidates;
  }

  get inviteLink() {
    return cy.get(dtPartnersList.inviteLink);
  }

  get vueWrapper(): Wrapper<Vue> {
    return Cypress.vueWrapper;
  }

  get actualComponent(): PartnersListComponent {
    return this.vueWrapper.findComponent(Component).vm as PartnersListComponent;
  }

  get invitePartnerRoute(): Partial<Route> {
    return this.actualComponent.invitePartnerRoute;
  }

  get attachButton() {
    return cy.get(dtPartnersList.attachButton);
  }

  displayedActivationDate(activationDate: string): string {
    return this.actualComponent.displayedActivationDate(activationDate);
  }
}

function create() {
  clearCyRoot();

  mount(Component, {
    propsData: {
      candidates
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
