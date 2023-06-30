import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { COMPONENT_NAME, PartnersAttachmentDialogTextAttribute, PartnersAttachmentDialogTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { uiButton } from '~/components/ui';
import { UiButtonSize, UiButtonView } from '~/components/ui/button/component';
import { uiDialog } from '~/components/ui/dialog';
import { BranchInfoResponse } from '~/shared/repository/repo';
import { EXTERNAL_CURRENCY } from '~/static-data/common-text-attributes';

export enum PartnersAttachmentDialogEvent {
  close = 'update:isVisible',
  confirmation = 'confirmation'
}

@Component({
  name: COMPONENT_NAME,
  components: {
    uiButton,
    uiDialog
  }
})
export default class extends mixins(TestId, Translatable) {
  @Prop({
    type: Boolean,
    required: true
  }) readonly isVisible: boolean;

  @Prop({
    type: Object,
    default: () => ({})
  }) readonly branchInfo: BranchInfoResponse

  readonly textAttributes = this.transAll(PartnersAttachmentDialogTextAttribute);
  readonly testLocators = PartnersAttachmentDialogTestLocator;

  readonly uiButtonSize = UiButtonSize;
  readonly uiButtonView = UiButtonView;

  get partnerLogin(): number {
    return this.branchInfo.partner.login;
  }

  get firstNamePartner(): string {
    return this.branchInfo.partner.firstName;
  }

  get lastNamePartner(): string {
    return this.branchInfo.partner.lastName;
  }

  get branchNumber(): number {
    return this.branchInfo.number;
  }

  get goStatusTurnover(): number {
    return this.branchInfo.commerce;
  }

  get writeOff(): number {
    return this.branchInfo.decommissioningFromLargeBranch;
  }

  get groupBonus(): number {
    return this.branchInfo.groupBonus;
  }

  get balanceStatus(): number {
    return this.branchInfo.remainingFunds;
  }

  get isBigBranch(): boolean {
    return this.branchInfo.isBig;
  }

  get displayedTitle(): string {
    return `${this.textAttributes.title} ${this.branchNumber}`;
  }

  get displayedTurnover(): string {
    const { branch } = this.textAttributes;

    return `${this.goStatusTurnover} ${EXTERNAL_CURRENCY} ${branch} ${this.branchNumber}`;
  }

  get displayedBranchSize(): string {
    const { miniBranch, bigBranch } = this.textAttributes;

    return this.isBigBranch ? bigBranch : miniBranch;
  }

  get displayedGroupBonus(): string {
    return `${this.groupBonus} ${this.textAttributes.rub}`;
  }

  get displayedWriteOff(): string {
    return `${this.writeOff} ${EXTERNAL_CURRENCY}`;
  }

  get displayedBalance(): string {
    const { branch } = this.textAttributes;

    return `${this.balanceStatus} ${EXTERNAL_CURRENCY} ${branch} ${this.branchNumber}`;
  }

  onClose(): void {
    this.$emit(PartnersAttachmentDialogEvent.close, false);
  }

  onConfirmation(): void {
    this.$emit(PartnersAttachmentDialogEvent.confirmation);
  }
}
