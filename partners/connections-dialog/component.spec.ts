import { mount } from 'cypress/vue2';
import Component from './component.vue';
import { getComponentName } from '~/shared/utils/unit-test/get-component-name';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import { dtPartnersConnectionsDialog, PartnersConnectionsDialogTextAttribute } from './attributes';
import { PartnersConnectionsDialogComponent } from '.';
import { fakeBranchInfo } from '~/shared/repository/fixtures/fake-branch-info';
import { fakeHierarchyToTopPartnerStart, fakeHierarchyToTopDataList } from '~/shared/repository/fixtures/fake-hierarchy';
import { assertValuesAreEqual } from '~/shared/utils/unit-test/assertions';

const partnerStartData = fakeHierarchyToTopPartnerStart();
const hierarchy = fakeHierarchyToTopDataList();
const branchInfo = fakeBranchInfo();

describe(getComponentName(Component), () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('отображается верные данные партнера', () => {
    page.assertBlockPartnerInfoBehaviourIsCorrect();
  });

  it('список иерархии отображается', () => {
    page.list.should('be.visible');
  });

  it('отображается валидное кол-во элементов', () => {
    page.item.should('have.length', hierarchy.length);
  });

  it('каждый элемент отображается и содержит валидные данные', () => {
    cy.viewport(768, 992);

    page.item.each(($item, index) => {
      const wrappedItem = cy.wrap($item);
      const currentItem = hierarchy[index];

      wrappedItem
        .should('be.visible')
        .within(() => {
          page.hierarchyLogin
            .should('be.visible')
            .contains(currentItem.login);

          page.hierarchyName
            .should('be.visible')
            .contains(currentItem.firstName);

          page.hierarchyGoStatus
            .should('be.visible')
            .contains(currentItem.goStatus);

          page.sponsorId
            .should('be.visible')
            .contains(partnerStartData.sponsor.login);

          page.sponsorName
            .should('be.visible')
            .contains(partnerStartData.sponsor.firstName)
            .contains(partnerStartData.sponsor.lastName);
        });
    });
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersConnectionsDialog.block);
  }

  get blockStartPartner() {
    return cy.get(dtPartnersConnectionsDialog.blockStartPartner);
  }

  get branchInfo() {
    return cy.get(dtPartnersConnectionsDialog.branchInfo);
  }

  get branchSize() {
    return cy.get(dtPartnersConnectionsDialog.branchSize);
  }

  get displayedBranchSize() {
    return this.actualComponent.displayedBranchSize;
  }

  get blockPartnerInfo() {
    return cy.get(dtPartnersConnectionsDialog.blockPartnerInfo);
  }

  get partnerName() {
    return cy.get(dtPartnersConnectionsDialog.partnerName);
  }

  get displayedPartnerName() {
    return this.actualComponent.displayedPartnerName;
  }

  assertBlockPartnerInfoBehaviourIsCorrect(): void {
    this.blockStartPartner.should('be.visible');

    this.branchInfo
      .should('be.visible')
      .contains(PartnersConnectionsDialogTextAttribute.branch)
      .contains(branchInfo.number);

    this.branchSize
      .should('be.visible')
      .invoke('text')
      .then(($text) => {
        assertValuesAreEqual($text, this.displayedBranchSize);
      });

    this.partnerName
      .should('be.visible')
      .invoke('text')
      .then(($text) => {
        assertValuesAreEqual($text, this.displayedPartnerName);
      });
  }

  get vueWrapper() {
    return Cypress.vueWrapper;
  }

  get actualComponent(): PartnersConnectionsDialogComponent {
    return this.vueWrapper.findComponent(Component).vm as PartnersConnectionsDialogComponent;
  }

  get list() {
    return cy.get(dtPartnersConnectionsDialog.list);
  }

  get item() {
    return cy.get(dtPartnersConnectionsDialog.item);
  }

  get hierarchyLogin() {
    return cy.get(dtPartnersConnectionsDialog.hierarchyLogin);
  }

  get hierarchyName() {
    return cy.get(dtPartnersConnectionsDialog.hierarchyName);
  }

  get hierarchyGoStatus() {
    return cy.get(dtPartnersConnectionsDialog.hierarchyGoStatus);
  }

  get sponsorId() {
    return cy.get(dtPartnersConnectionsDialog.sponsorId);
  }

  get sponsorName() {
    return cy.get(dtPartnersConnectionsDialog.sponsorName);
  }
}

function create() {
  clearCyRoot();

  mount(Component, {
    propsData: {
      isVisible: true,
      partnerStartData,
      hierarchy,
      branchInfo
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
