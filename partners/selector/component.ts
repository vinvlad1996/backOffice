import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { isEmpty } from 'lodash';
import { COMPONENT_NAME, PartnersSelectorTextAttribute, PartnersSelectorTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { uiButton, uiRadio } from '~/components/ui';
import { UiButtonView, UiButtonSize } from '~/components/ui/button/component';
import { CONVENTIONAL_UNITS } from '~/static-data/common-text-attributes';
import { uiIconDivider } from '~/components/ui/icons';
import { PartnersDataForHierarchyToTop } from '../model';
import { PartnersTree } from '~/components/partners/tree';

enum PartnersSelectorEvent {
  update = 'update:partner-login',
  attach = 'attach'
}

@Component({
  name: COMPONENT_NAME,
  components: {
    uiButton,
    uiRadio,
    uiIconDivider,
    PartnersTree
  }
})
export default class extends mixins(TestId, Translatable) {
  @Prop({
    type: Number
  }) readonly partnerLogin: number;

  @Prop({
    type: Object,
    required: true
  }) readonly partnerData: PartnersDataForHierarchyToTop;

  @Prop({
    type: String,
    default: ''
  }) readonly partnerName: string;

  readonly textAttributes = this.transAll(PartnersSelectorTextAttribute);
  readonly testLocators = PartnersSelectorTestLocator;

  readonly uiButtonView = UiButtonView;
  readonly uiButtonSize = UiButtonSize;

  get isPartnerDataEmpty(): boolean {
    return isEmpty(this.partnerData);
  }

  get isActive(): boolean {
    if (this.isPartnerDataEmpty) {
      return false;
    }

    return this.partnerLogin === this.partnerData.login;
  }

  get displayedGoStatus(): string {
    return this.isPartnerDataEmpty ? '' : `${0} ${CONVENTIONAL_UNITS}`;
  }

  get displayedRankTitle(): string {
    return this.isPartnerDataEmpty ? '' : this.trans(this.partnerData.rankTitle);
  }

  get displayedButtonText(): string {
    return `${this.textAttributes.attach} ${this.partnerName}`;
  }

  selected(partnerLogin: number): void {
    this.$emit(PartnersSelectorEvent.update, partnerLogin);
  }

  attach(): void {
    this.$emit(PartnersSelectorEvent.attach);
  }
}
