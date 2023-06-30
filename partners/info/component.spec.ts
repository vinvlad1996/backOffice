import { mount } from 'cypress/vue2';
import Component from './component.vue';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import { getComponentName } from '~/shared/utils/unit-test/get-component-name';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { dtPartnersInfo } from './attributes';
import { fakePartnersSponsor } from '~/shared/repository/fixtures/partners';

const { login, firstName, lastName } = fakePartnersSponsor();

describe(getComponentName(Component), () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('логин отображается и содержит валидные данные', () => {
    page.login
      .should('be.visible')
      .contains(login);
  });

  it('ФИО отображается и содержит валидные данные', () => {
    page.fio
      .should('be.visible')
      .contains(firstName)
      .contains(lastName);
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersInfo.block);
  }

  get login() {
    return cy.get(dtPartnersInfo.login);
  }

  get fio() {
    return cy.get(dtPartnersInfo.fio);
  }
}

function create() {
  clearCyRoot();

  mount(Component, {
    propsData: {
      login,
      firstName,
      lastName
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
