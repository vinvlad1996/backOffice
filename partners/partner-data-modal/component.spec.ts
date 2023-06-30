import { mount } from 'cypress/vue2';
import Component from './component.vue';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import { COMPONENT_NAME, dtPartnerDataModal, PartnerDataModalTextAttribute } from './attributes';
import { fakeUserInfoExtended } from '~/shared/repository/fixtures/fake-user-info-extended';
import { userRepo } from '~/shared/repository/fake-services-factory';

const personalProfileData = fakeUserInfoExtended();

describe(COMPONENT_NAME, () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('полное имя отображается и содержит валидные данные', () => {
    page.profileName
      .should('be.visible')
      .contains(personalProfileData.firstName)
      .contains(personalProfileData.lastName);
  });

  it('ветка отображается и содержит валидные данные', () => {
    page.branch
      .should('be.visible')
      .contains(PartnerDataModalTextAttribute.branch)
      .contains(personalProfileData.positionsInStructure.branchNumber);
  });

  it('ветка отображается и содержит валидные данные', () => {
    page.level
      .should('be.visible')
      .contains(PartnerDataModalTextAttribute.levelTitle)
      .contains(personalProfileData?.positionsInStructure.level);
  });

  it('фото отображается и содержит валидные данные', () => {
    page.photo
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', personalProfileData.avatar);
  });

  it('divider отображаются', () => {
    page.divider
      .should('be.visible');
  });

  it('подзаголовок отображается и содержит валидные данные', () => {
    page.text
      .should('be.visible')
      .contains(PartnerDataModalTextAttribute.currentQualificationTitle);
  });

  it('данные спонсора отображаются и содержат валидные данные', () => {
    page.sponsor
      .should('be.visible')
      .contains(personalProfileData.sponsor.login)
      .contains(personalProfileData.sponsor.firstName)
      .contains(personalProfileData.sponsor.lastName);
  });

  it('квалификация отображается и содержит валидные данные', () => {
    page.qualification
      .should('be.visible')
      .contains(personalProfileData.rank.title);
  });

  it('ветка отображается и содержит валидные данные', () => {
    page.goStatus
      .should('be.visible')
      .contains(personalProfileData.goStatusTitle)
      .contains(personalProfileData.goStatus);
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnerDataModal.block);
  }

  get branch() {
    return cy.get(dtPartnerDataModal.branch);
  }

  get level() {
    return cy.get(dtPartnerDataModal.level);
  }

  get photo() {
    return cy.get(dtPartnerDataModal.photo);
  }

  get profileName() {
    return cy.get(dtPartnerDataModal.profileName);
  }

  get divider() {
    return cy.get(dtPartnerDataModal.divider);
  }

  get text() {
    return cy.get(dtPartnerDataModal.text);
  }

  get goStatus() {
    return cy.get(dtPartnerDataModal.goStatus);
  }

  get qualification() {
    return cy.get(dtPartnerDataModal.qualification);
  }

  get sponsor() {
    return cy.get(dtPartnerDataModal.sponsor);
  }
}

function create() {
  userRepo.UPDATE_USER_INFO_EXTENDED(fakeUserInfoExtended());
  clearCyRoot();

  mount(Component, {
    propsData: {
      isVisible: true
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
