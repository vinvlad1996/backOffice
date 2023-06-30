import { Component, Prop, mixins } from 'nuxt-property-decorator';
import { COMPONENT_NAME, PartnersConnectionsDialogTextAttribute, PartnersConnectionsDialogTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { uiDialog } from '~/components/ui/dialog';
import { BranchInfoResponse } from '~/shared/repository/repo';
import { PartnersStartForHierarchyToTop, PartnersDataForHierarchyToTop } from '~/components/partners/model';
import { PartnersInfo } from '~/components/partners/info';
import Icon from '~/shared/utils/icon-mixin';
import { EXTERNAL_CURRENCY } from '~/static-data/common-text-attributes';
import { UiDividerColor, UiDividerOrientation } from '~/components/ui/divider/component';
import { uiDivider } from '~/components/ui/divider';
import { uiDialogView } from '~/components/ui/dialog/component';

export enum PartnersConnectionsDialogEvent {
  close = 'update:isVisible'
}

@Component({
  name: COMPONENT_NAME,
  components: {
    uiDialog,
    uiDivider,
    PartnersInfo
  }
})
export default class extends mixins(TestId, Translatable, Icon) {
  @Prop({
    type: Boolean,
    required: true
  }) readonly isVisible: boolean;

  @Prop({
    type: Object,
    default: () => ({})
  }) readonly partnerStartData: PartnersStartForHierarchyToTop

  @Prop({
    type: Array,
    required: true
  }) readonly hierarchy: PartnersDataForHierarchyToTop[]

  @Prop({
    type: Object,
    default: () => ({})
  }) readonly branchInfo: BranchInfoResponse

  readonly textAttributes = this.transAll(PartnersConnectionsDialogTextAttribute);
  readonly testLocators = PartnersConnectionsDialogTestLocator;

  readonly uiDividerOrientation = UiDividerOrientation;
  readonly uiDividerColor = UiDividerColor;
  readonly uiDialogView = uiDialogView;

  readonly externalCurrency = EXTERNAL_CURRENCY;

  get loginPartner(): number {
    return this.partnerStartData.login;
  }

  get goStatusPartner(): number {
    return this.partnerStartData.goStatus;
  }

  get firstNamePartner(): string {
    return this.partnerStartData.firstName;
  }

  get lastNamePartner(): string {
    return this.partnerStartData.lastName;
  }

  get rankTitle(): string {
    return this.partnerStartData.rankTitle;
  }

  get idSponsor(): number {
    return this.partnerStartData.sponsor.login;
  }

  get firstNameSponsor(): string {
    return this.partnerStartData.sponsor.firstName;
  }

  get lastNameSponsor(): string {
    return this.partnerStartData.sponsor.lastName;
  }

  get branchNumber(): number {
    return this.branchInfo.number;
  }

  get displayedBranchSize(): string {
    const { miniBranch, bigBranch } = this.textAttributes;

    return this.branchInfo.isBig
      ? bigBranch
      : miniBranch;
  }

  get displayedSponsorName(): string {
    return `${this.firstNameSponsor} ${this.lastNameSponsor}`;
  }

  get displayedPartnerName(): string {
    return `${this.firstNamePartner} ${this.lastNamePartner}`;
  }

  onClose(): void {
    this.$emit(PartnersConnectionsDialogEvent.close, false);
  }
}
