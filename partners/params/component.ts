import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { isEmpty } from 'lodash';
import { COMPONENT_NAME, PartnersParamsTextAttribute, PartnersParamsTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { PartnersLastBranch, PartnersDataForHierarchyToTop } from '../model';
import { CONVENTIONAL_UNITS } from '~/static-data/common-text-attributes';

export enum PartnersParamsLoginView {
  success = 'success',
  warning = 'warning'
}

export enum PartnersParamsDisplay {
  column = 'column',
  row = 'row'
}

@Component({
  name: COMPONENT_NAME
})
export default class extends mixins(TestId, Translatable) {
  @Prop({
    type: String,
    default: PartnersParamsLoginView.success,
    validator: val => Object.values(PartnersParamsLoginView).includes(val)
  }) readonly view: PartnersParamsLoginView;

  @Prop({
    type: String,
    default: PartnersParamsDisplay.column,
    validator: val => Object.values(PartnersParamsDisplay).includes(val)
  }) readonly display: PartnersParamsDisplay;

  @Prop({
    type: Object,
    default: () => ({})
  }) readonly partnerData: PartnersLastBranch | PartnersDataForHierarchyToTop;

  @Prop({
    type: Boolean,
    default: true
  }) readonly hasSponsorFio: boolean;

  readonly textAttributes = this.transAll(PartnersParamsTextAttribute)
  readonly testLocators = PartnersParamsTestLocator;

  get isPartnerDataEmpty(): boolean {
    return isEmpty(this.partnerData);
  }

  get isRowDisplay(): boolean {
    return this.display === PartnersParamsDisplay.row;
  }

  get isSponsorFioShown(): boolean {
    return this.hasSponsorFio && !this.isRowDisplay;
  }

  get displayedLogin(): number {
    return this.partnerData.login;
  }

  get displayedGoStatus(): string {
    return `${this.partnerData.goStatus} ${CONVENTIONAL_UNITS}`;
  }

  get displayedRankTitle(): string {
    return this.trans(this.partnerData.rankTitle);
  }

  get displayedFio(): string {
    return `${this.partnerData.firstName} ${this.partnerData.lastName}`;
  }
}
