import { mount } from 'cypress/vue2';
import Component from './component.vue';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { COMPONENT_NAME, PartnersCollapseTextAttribute, dtPartnersCollapse } from './attributes';
import { PartnersCollapseComponent } from './index';
import { dtCollapseAll } from '~/components/catalog/filter-button/collapse-all/attributes';
import { dtExpandAll } from '~/components/catalog/filter-button/expand-all/attributes';
import { PartnersViewTreeParams } from '../model';
import { fakeViewTreeResponse } from '~/shared/repository/fixtures/fake-view-tree';
import { EXTERNAL_CURRENCY } from '~/static-data/common-text-attributes';

describe(COMPONENT_NAME, () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('компонент инициализируется', () => {
    page.wrapper.should('be.visible');
  });

  it('блок с поиском отображается и содержит валидные данные', () => {
    page.searchBlock
      .should('be.visible')
      .within(() => {
        page.searchInput.should('be.visible');
        page.iconSearch.should('be.visible');
      });
  });

  it('блок с настройками отображается и содержит валидные данные', () => {
    page.configuration
      .should('be.visible')
      .within(() => {
        page.configurationTitle
          .should('be.visible')
          .contains(PartnersCollapseTextAttribute.expandBranch);
        page.configurationLevels.should('be.visible');
        page.collapseAll.should('be.visible');
        page.expandAll.should('be.visible');
      });
  });

  it('дерево отображается и содержит валидные данные', () => {
    page.actualComponent.isBranchesAllExpanded = true;
    page.tree
      .should('be.visible')
      .within(() => {
        const valuesOfViewTreeResponse: PartnersViewTreeParams[] = Object.values(fakeViewTreeResponse());
        const partnersForTree = valuesOfViewTreeResponse.flatMap(item => item);

        partnersForTree.forEach((_, index) => {
          const { partner, partnersInTree } = partnersForTree[index];

          page.getTreeWrapper(partner.login)
            .should('be.visible')
            .within(() => {
              page.treeContent.should('be.visible');
              page.treePartnerLogin.should('be.visible').contains(partner.login);
              page.treePartnerFio
                .should('be.visible')
                .contains(partner.firstName)
                .contains(partner.lastName);
              page.treePartnerGpv
                .should('be.visible')
                .contains(partner.gpv)
                .contains(EXTERNAL_CURRENCY);
            });

          if (partnersInTree) {
            page.treeText
              .should('be.visible')
              .contains(page.displayedText(partnersInTree));
          }
        });
      });
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersCollapse.block);
  }

  get iconSearch() {
    return cy.get('[data-test="ui-icon-search"]');
  }

  get collapseAll() {
    return cy.get(dtCollapseAll.collapseAll);
  }

  get expandAll() {
    return cy.get(dtExpandAll.expandAll);
  }

  get searchBlock() {
    return cy.get(dtPartnersCollapse.searchBlock);
  }

  get searchInput() {
    return cy.get(dtPartnersCollapse.searchInput);
  }

  get configuration() {
    return cy.get(dtPartnersCollapse.configuration);
  }

  get configurationTitle() {
    return cy.get(dtPartnersCollapse.configurationTitle);
  }

  get configurationLevels() {
    return cy.get(dtPartnersCollapse.configurationLevels);
  }

  get tree() {
    return cy.get(dtPartnersCollapse.tree);
  }

  get treeContent() {
    return cy.get(dtPartnersCollapse.treeContent);
  }

  get treePartnerLogin() {
    return cy.get(dtPartnersCollapse.treePartnerLogin);
  }

  get treePartnerFio() {
    return cy.get(dtPartnersCollapse.treePartnerFio);
  }

  get treePartnerGpv() {
    return cy.get(dtPartnersCollapse.treePartnerGpv);
  }

  get treeText() {
    return cy.get(dtPartnersCollapse.treeText);
  }

  get vueWrapper() {
    return Cypress.vueWrapper;
  }

  get actualComponent(): PartnersCollapseComponent {
    return this.vueWrapper.findComponent(Component).vm as PartnersCollapseComponent;
  }

  getTreeWrapper(login: number) {
    return cy.get(`[tree-partner-login="${login}"]`);
  }

  displayedText(partnersInTree: number): string {
    return this.actualComponent.displayedText(partnersInTree);
  }
}

function create() {
  clearCyRoot();

  mount(Component, {
    propsData: {
      viewTreeResponse: fakeViewTreeResponse()
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
