import { mount } from 'cypress/vue2';
import { Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Component from './component.vue';
import { clearCyRoot } from '~/shared/utils/unit-test/clear-cy-root';
import { getComponentName } from '~/shared/utils/unit-test/get-component-name';
import cypressExtensions from '~/shared/utils/unit-test/cypress-extensions';
import { dtPartnersAttachmentDialog, PartnersAttachmentDialogTextAttribute } from './attributes';
import { fakeBranchInfo } from '~/shared/repository/fixtures/fake-branch-info';
import { PartnersAttachmentDialogEvent } from './component';
import { PartnersAttachmentDialogComponent } from '.';
import { assertEventEmitted } from '~/shared/utils/unit-test/assertions';

const branchInfo = fakeBranchInfo();

describe(getComponentName(Component), () => {
  let page: PageObject;

  beforeEach(() => {
    page = create();
  });

  it('логин отображается и содержит валидные данные', () => {
    page.login
      .should('be.visible')
      .contains(branchInfo.partner.login);
  });

  it('имя и фамилия отображаются и содержат валидные данные', () => {
    page.name
      .should('be.visible')
      .contains(branchInfo.partner.firstName)
      .contains(branchInfo.partner.lastName);
  });

  it('заголовок баннера отображается и содержит валидные данные', () => {
    page.bannerTitle
      .should('be.visible')
      .contains(PartnersAttachmentDialogTextAttribute.bannerTitle);
  });

  it('отображается верная информация о ветке', () => {
    page.assertBlockBranchInfoBehaviourIsCorrect();
  });

  it('отображается списание с ветки', () => {
    page.assertBlockkWriteOffBehaviourIsCorrect();
  });

  it('отображается групповой бонус', () => {
    page.assertBlockkBonusBehaviourIsCorrect();
  });

  it('отображается остаток', () => {
    page.assertBlockkBalanceBehaviourIsCorrect();
  });

  it('комментарий отображается и содержит валидные данные', () => {
    page.comment
      .should('be.visible')
      .contains(PartnersAttachmentDialogTextAttribute.comment);
  });

  it(`по клику на кнопку "Подтвердить" эмитит событие ${PartnersAttachmentDialogEvent.confirmation}`, () => {
    page.confirmationButton
      .should('be.visible')
      .click()
      .then(() => {
        assertEventEmitted(PartnersAttachmentDialogEvent.confirmation);
      });
  });
});

class PageObject {
  get wrapper() {
    return cy.get(dtPartnersAttachmentDialog.block);
  }

  get login() {
    return cy.get(dtPartnersAttachmentDialog.login);
  }

  get name() {
    return cy.get(dtPartnersAttachmentDialog.name);
  }

  get blockBranchInfo() {
    return cy.get(dtPartnersAttachmentDialog.blockBranchInfo);
  }

  get turnover() {
    return cy.get(dtPartnersAttachmentDialog.turnover);
  }

  get branchTurnover() {
    return cy.get(dtPartnersAttachmentDialog.branchTurnover);
  }

  get displayedTurnover() {
    return this.actualComponent.displayedTurnover;
  }

  get displayedBranchSize() {
    return this.actualComponent.displayedBranchSize;
  }

  get blockWriteOff() {
    return cy.get(dtPartnersAttachmentDialog.blockWriteOff);
  }

  get writeOffText() {
    return cy.get(dtPartnersAttachmentDialog.writeOffText);
  }

  get writeOff() {
    return cy.get(dtPartnersAttachmentDialog.writeOff);
  }

  get displayedWriteOff() {
    return this.actualComponent.displayedWriteOff;
  }

  get blockBonus() {
    return cy.get(dtPartnersAttachmentDialog.blockBonus);
  }

  get bonusText() {
    return cy.get(dtPartnersAttachmentDialog.bonusText);
  }

  get bonus() {
    return cy.get(dtPartnersAttachmentDialog.bonus);
  }

  get displayedGroupBonus() {
    return this.actualComponent.displayedGroupBonus;
  }

  get blockBalance() {
    return cy.get(dtPartnersAttachmentDialog.blockBalance);
  }

  get balanceText() {
    return cy.get(dtPartnersAttachmentDialog.balanceText);
  }

  get balance() {
    return cy.get(dtPartnersAttachmentDialog.balance);
  }

  get displayedBalance() {
    return this.actualComponent.displayedBalance;
  }

  assertBlockBranchInfoBehaviourIsCorrect(): void {
    this.blockBranchInfo.should('be.visible');

    this.turnover
      .should('be.visible')
      .contains(PartnersAttachmentDialogTextAttribute.turnover);

    this.branchTurnover
      .should('be.visible')
      .contains(this.displayedBranchSize);
  }

  assertBlockkWriteOffBehaviourIsCorrect(): void {
    this.blockWriteOff.should('be.visible');

    this.writeOffText
      .should('be.visible')
      .contains(PartnersAttachmentDialogTextAttribute.writeOffBigBranch);

    this.writeOff
      .should('be.visible')
      .contains(this.displayedWriteOff);
  }

  assertBlockkBonusBehaviourIsCorrect(): void {
    this.blockBonus.should('be.visible');

    this.bonusText
      .should('be.visible')
      .contains(PartnersAttachmentDialogTextAttribute.groupBonus);

    this.bonus
      .should('be.visible')
      .contains(PartnersAttachmentDialogTextAttribute.rub)
      .contains(this.displayedGroupBonus);
  }

  assertBlockkBalanceBehaviourIsCorrect(): void {
    this.blockBalance.should('be.visible');

    this.balanceText
      .should('be.visible')
      .contains(PartnersAttachmentDialogTextAttribute.balance);

    this.balance
      .should('be.visible')
      .contains(PartnersAttachmentDialogTextAttribute.branch)
      .contains(this.displayedBalance);
  }

  get vueWrapper(): Wrapper<Vue> {
    return Cypress.vueWrapper;
  }

  get actualComponent(): PartnersAttachmentDialogComponent {
    return this.vueWrapper.findComponent(Component).vm as PartnersAttachmentDialogComponent;
  }

  get bannerTitle() {
    return cy.get(dtPartnersAttachmentDialog.bannerTitle);
  }

  get comment() {
    return cy.get(dtPartnersAttachmentDialog.comment);
  }

  get confirmationButton() {
    return cy.get(dtPartnersAttachmentDialog.confirmationButton);
  }
}

function create() {
  clearCyRoot();

  mount(Component, {
    propsData: {
      branchInfo,
      isVisible: true
    },
    ...cypressExtensions()
  });

  return new PageObject();
}
