import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { COMPONENT_NAME, PartnersSuccessDialogTextAttribute, PartnersSuccessDialogTestLocator } from './attribute';
import { Translatable } from '~/components/shared/translatable';
import { uiButton } from '~/components/ui';
import { UiButtonView, UiButtonSize } from '~/components/ui/button/component';
import { uiDialog } from '~/components/ui/dialog';
import { BranchInfoResponse } from '~/shared/repository/repo';
import TestId from '~/shared/utils/unit-test/test-id';

export enum SuccessDialogEvent {
  close = 'update:isVisible'
}
@Component({
  name: COMPONENT_NAME,
  components: {
    uiDialog,
    uiButton
  }
})

export default class extends mixins(TestId, Translatable) {
  @Prop({
    type: Boolean,
    required: true
  }) readonly isVisible: boolean

  @Prop({
    type: Object,
    default: () => ({})
  }) readonly branchInfo: BranchInfoResponse

  readonly textAttributes = this.transAll(PartnersSuccessDialogTextAttribute);
  readonly testLocators = PartnersSuccessDialogTestLocator;

  readonly picture: string = require('@assets/images/success-attachment.png');

  readonly uiButtonView = UiButtonView;
  readonly uiButtonSize = UiButtonSize;

  get firstNamePartner(): string {
    return this.branchInfo.partner.firstName;
  }

  get lastNamePartner(): string {
    return this.branchInfo.partner.lastName;
  }

  get branchNumber(): number {
    return this.branchInfo.number;
  }

  get displayedDescription(): string {
    const { description } = this.textAttributes;

    return `${this.firstNamePartner} ${this.lastNamePartner} ${description} ${this.branchNumber}`;
  }

  onClose(): void {
    this.$emit(SuccessDialogEvent.close, false);
  }
}
