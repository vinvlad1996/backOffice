import { mount } from 'cypress/vue2';
import Component from './component.vue';
import { getComponentName } from '~/shared/utils/unit-test/get-component-name';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import { dtPartnersSwitchBanner, PartnersSwitchBannerTextAttribute } from './attributes';
import { PartnersSwitchBannerEvent } from './component';
import { assertEventEmitted } from '~/shared/utils/unit-test/assertions';

describe(getComponentName(Component), () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('заголовок отображается и содержит валидный текст', () => {
    page.title
      .should('be.visible')
      .contains(PartnersSwitchBannerTextAttribute.bannerTitle);
  });

  it(`по клику эмитит событие ${PartnersSwitchBannerEvent.update}`, () => {
    page.changeValue
      .click()
      .then(() => {
        assertEventEmitted(PartnersSwitchBannerEvent.update);
      });
  });

  it('описание отображается и содержит валидный текст', () => {
    page.description
      .should('be.visible')
      .contains(PartnersSwitchBannerTextAttribute.bannerDescription);
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersSwitchBanner.block);
  }

  get title() {
    return cy.get(dtPartnersSwitchBanner.title);
  }

  get changeValue() {
    return cy.get(dtPartnersSwitchBanner.changeValue);
  }

  get description() {
    return cy.get(dtPartnersSwitchBanner.description);
  }
}

function create() {
  clearCyRoot();

  mount(Component, {
    propsData: {
      isChecked: false
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
