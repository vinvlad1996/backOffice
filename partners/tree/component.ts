import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { isEmpty, first } from 'lodash';
import { COMPONENT_NAME, PartnersTreeTextAttribute, PartnersTreeTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { uiButton, uiRadio } from '~/components/ui';
import { UiButtonSize, UiButtonView } from '~/components/ui/button/component';
import { EXTERNAL_CURRENCY } from '~/static-data/common-text-attributes';
import { PartnersLastBranch, PartnersBranchRegular, PartnersStartPartnerWithGoStatus } from '../model';

import Icon from '~/shared/utils/icon-mixin';

export enum PartnersTreeEvent {
  openCommunications = 'open-communications',
  selectBranchNumber = 'update:branch-number'
}

enum PartnersTreeView {
  default = 'default',
  selected = 'selected',
  available = 'available',
  notAvailable = 'not-available'
}

const FIXED_QUANTITY_BRANCH = 9;
const FIXED_START_INDEX = 1;

@Component({
  name: COMPONENT_NAME,
  components: {
    uiButton,
    uiRadio
  }
})
export default class extends mixins(TestId, Translatable, Icon) {
  @Prop({
    type: Object,
    required: true
  }) readonly partnerData: PartnersLastBranch;

  @Prop({
    type: Number,
    default: null
  }) readonly branchNumber: number;

  readonly textAttributes = this.transAll(PartnersTreeTextAttribute);
  readonly testLocators = PartnersTreeTestLocator;

  readonly uiButtonSize = UiButtonSize;
  readonly uiButtonView = UiButtonView;

  readonly externalCurrency = EXTERNAL_CURRENCY;

  listNumbersOfAvailableBranches = [];

  get hasPartnerData(): boolean {
    return !isEmpty(this.partnerData);
  }

  get branches(): PartnersBranchRegular[] {
    if (!this.hasPartnerData) {
      return [];
    }

    return this.partnerData.branches;
  }

  get branchesParamsWithPartners(): PartnersTreeParams[] {
    if (!this.hasPartnerData) {
      return [];
    }

    return this.branches.map(item => {
      const { number, free } = item;
      let branch: PartnersTreeParams;

      if (free) {
        branch = { number, view: PartnersTreeView.available };
      }

      if (!free && Boolean(item.startPartner)) {
        const { login, firstName, lastName, goStatus } = item.startPartner as PartnersStartPartnerWithGoStatus;
        branch = {
          view: PartnersTreeView.default,
          login,
          firstName,
          lastName,
          number,
          goStatus
        };
      }

      return branch;
    });
  }

  get treeParams(): PartnersTreeParams[] {
    const { branchesParamsWithPartners } = this;
    const quantityOfRemainingBranches = FIXED_QUANTITY_BRANCH - branchesParamsWithPartners.length;
    const branchParamsForNotAvailable = { view: PartnersTreeView.notAvailable };
    const branches: PartnersTreeParams[] = [
      ...branchesParamsWithPartners,
      ...Array(quantityOfRemainingBranches).fill(branchParamsForNotAvailable)
    ];

    let startIndex = null;

    this.listNumbersOfAvailableBranches = branches
      .filter(item => item.view === PartnersTreeView.available)
      .map(item => item.number);

    if (this.branchNumber) {
      startIndex = this.branchNumber;
    }

    if (!this.branchNumber && this.listNumbersOfAvailableBranches.length) {
      startIndex = first(this.listNumbersOfAvailableBranches);
    }

    if (startIndex) {
      branches.splice(startIndex - FIXED_START_INDEX, 1, { view: PartnersTreeView.selected });
    }

    return branches.map((item, index) => ({ ...item, number: index + FIXED_START_INDEX }));
  }

  isDefaultView(view: PartnersTreeView): boolean {
    return view === PartnersTreeView.default;
  }

  isSelectedView(view: PartnersTreeView): boolean {
    return view === PartnersTreeView.selected;
  }

  isAvailableView(view: PartnersTreeView): boolean {
    return view === PartnersTreeView.available;
  }

  isButtonDisabled(number: number): boolean {
    return !this.listNumbersOfAvailableBranches.includes(number);
  }

  openCommunications(): void {
    this.$emit(PartnersTreeEvent.openCommunications);
  }

  selectBranchNumber(branchNumber: number): void {
    this.$emit(PartnersTreeEvent.selectBranchNumber, branchNumber);
  }
}

interface PartnersTreeParams {
  view: PartnersTreeView
  number?: number
  login?: number
  firstName?: string
  lastName?: string
  goStatus?: number
}
