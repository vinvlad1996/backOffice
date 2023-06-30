import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { COMPONENT_NAME, PartnerDataModalTextAttribute, PartnerDataModalTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import Icon from '~/shared/utils/icon-mixin';
import { uiDialog } from '~/components/ui/dialog';
import { uiDivider } from '~/components/ui/divider';
import { DeliveryAddressSelector } from '~/components/catalog/delivery-address-selector';
import { uiButton } from '~/components/ui';
import { PersonalProfileActivity } from '~/components/personal-profile/personal-profile-activity';
import { UserInfoExtendedResponse } from '~/shared/repository/repo';
import { EXTERNAL_CURRENCY } from '~/static-data/common-text-attributes';
import { AvailableAccountAddress } from '~/store/model';
import { UiDividerColor, UiDividerOpacity, UiDividerOrientation, UiDividerSize } from '~/components/ui/divider/component';
import { AddressSelectorView } from '~/components/catalog/delivery-address-selector/component';
import { ProfileActivityView } from '~/components/personal-profile/personal-profile-activity/component';
import { uiDialogView } from '~/components/ui/dialog/component';

export enum PartnerDataDialogEvent {
  close = 'update:is-visible'
}

@Component({
  name: COMPONENT_NAME,
  components: {
    uiDialog,
    uiDivider,
    DeliveryAddressSelector,
    uiButton,
    PersonalProfileActivity
  }
})
export default class extends mixins(TestId, Translatable, Icon) {
  @Prop({
    type: Boolean,
    required: true
  }) readonly isVisible: boolean;

  readonly textAttributes = this.transAll(PartnerDataModalTextAttribute);
  readonly testLocators = PartnerDataModalTestLocator;

  readonly uiDividerOrientation = UiDividerOrientation;
  readonly uiDividerColor = UiDividerColor;
  readonly uiDividerOpacity = UiDividerOpacity;
  readonly uiDividerSize = UiDividerSize;
  readonly addressSelectorView = AddressSelectorView;
  readonly profileActivityView = ProfileActivityView;
  readonly uiDialogView = uiDialogView;

  readonly externalCurrency = EXTERNAL_CURRENCY;

  readonly userRepo = this.$projectServices.userRepo;

  addresses: AvailableAccountAddress[] = [];

  get personalProfileData(): UserInfoExtendedResponse {
    return this.userRepo?.profileData;
  }

  get profileName(): string {
    return this.trans(`${this.personalProfileData?.firstName} <br> ${this.personalProfileData?.lastName}`);
  }

  get branchNumber(): number {
    return this.personalProfileData?.positionsInStructure.branchNumber;
  }

  get branchData(): string {
    const { branch } = this.textAttributes;

    return `${branch} ${this.branchNumber}`;
  }

  get currentLevel(): string {
    const { levelTitle } = this.textAttributes;

    return `${levelTitle} ${this.personalProfileData?.positionsInStructure.level}`;
  }

  get profilePhoto(): string {
    return this.personalProfileData?.avatar;
  }

  get goStatus(): number {
    return this.personalProfileData?.goStatus;
  }

  get currentGoStatus(): string {
    return `${this.personalProfileData?.goStatusTitle} ${this.goStatus} ${this.externalCurrency}`;
  }

  get currentQualification(): string {
    return this.personalProfileData?.rank.title;
  }

  get sponsorName(): string {
    const { id } = this.textAttributes;
    const { login, firstName, lastName } = this.personalProfileData.sponsor;

    return `${id}${login} ${firstName} ${lastName}`;
  }

  get profileId(): string {
    const { id } = this.textAttributes;

    return `${id} ${this.personalProfileData?.id}`;
  }

  onClose(): void {
    this.$emit(PartnerDataDialogEvent.close, false);
  }
}
