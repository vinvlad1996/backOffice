import { Component, mixins, Prop, Ref } from 'nuxt-property-decorator';
import { Tree } from 'element-ui';
import { isEmpty } from 'lodash';
import { COMPONENT_NAME, PartnersCollapseTextAttribute, PartnersCollapseTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { uiInput, uiTabs } from '~/components/ui';
import { UiInputView } from '~/components/ui/input/component';
import Icon from '~/shared/utils/icon-mixin';
import { CollapseAllButton, ExpandAllButton } from '~/components/catalog/filter-button/';
import { CatalogFilterButtonView } from '~/components/catalog/filter-button/model';
import { UiTabView } from '~/components/ui/tabs/tabs-common';
import { ViewTreeResponse } from '~/shared/repository/repo';
import { PartnersViewTreeParams } from '../model';
import { EXTERNAL_CURRENCY } from '~/static-data/common-text-attributes';

enum PartnersCollapseEvent {
  update = 'update:selected-level',
  changeLevel = 'change-level'
}

export enum PartnersCollapseFilterType {
  first = '1',
  second = '2',
  third = '3',
  fourth = '4',
  fifth = '5',
  sixth = '6'
}

export enum PartnersCollapseFilterValue {
  first,
  second,
  third,
  fourth,
  fifth,
  sixth
}

const DEFAULT_INITIAL_LEVEL = 1;

enum PartnersCollapseTreeProps {
  branches = 'branches'
}

@Component({
  name: COMPONENT_NAME,
  components: {
    CollapseAllButton,
    ExpandAllButton,
    uiInput,
    uiTabs,
    ElTree: Tree
  }
})
export default class extends mixins(TestId, Translatable, Icon) {
  @Prop({
    type: Object,
    default: () => ({})
  }) readonly viewTreeResponse: ViewTreeResponse;

  @Prop({
    type: Number,
    validator: val => Object.values(PartnersCollapseFilterValue).includes(val),
    default: PartnersCollapseFilterValue.first
  }) readonly selectedLevel: PartnersCollapseFilterValue;

  readonly textAttributes = this.transAll(PartnersCollapseTextAttribute);
  readonly testLocators = PartnersCollapseTestLocator;

  readonly uiInputView = UiInputView;

  readonly uiTabView = UiTabView;

  readonly catalogFilterButtonView = CatalogFilterButtonView;

  readonly externalCurrency = EXTERNAL_CURRENCY;

  @Ref('tree') elTree!: Tree;

  partnersSearch = '';

  defaultProps: Record<string, PartnersCollapseTreeProps> = {
    children: PartnersCollapseTreeProps.branches
  };

  isBranchesAllExpanded = false;

  get hasViewTreeResponse(): boolean {
    return !isEmpty(this.viewTreeResponse);
  }

  get hasOnlyBranchesLevel(): boolean {
    if (!this.hasViewTreeResponse) {
      return false;
    }

    return Object.keys(this.viewTreeResponse).length === DEFAULT_INITIAL_LEVEL;
  }

  get switchFilters(): string[] {
    return Object.values(PartnersCollapseFilterType);
  }

  get partnersTree(): PartnersViewTreeParams[] {
    if (!this.hasViewTreeResponse) {
      return [];
    }

    const viewTree: ViewTreeResponse = { ...this.viewTreeResponse };
    const keysOfViewTree = Object.keys(this.viewTreeResponse).reverse();

    for (let index = 0; index < keysOfViewTree.length - 1; index++) {
      const currentLevel = keysOfViewTree[index];
      const nextLevel = keysOfViewTree[index + 1];

      const branches: PartnersViewTreeParams[] = [...viewTree[currentLevel]];

      for (let id = 0; id < branches.length; id++) {
        const branch = branches[id];
        const { parentLogin } = branch;

        const currentParent = viewTree[nextLevel].find(item => this.isCurrentParent(item, parentLogin));
        const currentParentIndex = viewTree[nextLevel].findIndex(item => this.isCurrentParent(item, parentLogin));
        const currentParentBranches = currentParent.branches ? [...currentParent.branches] : [branch];

        viewTree[nextLevel][currentParentIndex] = { ...currentParent, branches: [...currentParentBranches] };
      }
    }

    return [...viewTree[DEFAULT_INITIAL_LEVEL]];
  }

  isCurrentParent(item: PartnersViewTreeParams, login: number): boolean {
    return item.partner.login === login;
  }

  isIncludedTextInPartnersSearch(text: string): boolean {
    return text.toLowerCase().includes(this.partnersSearch.toLowerCase());
  }

  isFilterPartnersTree(searchValue: string, params: PartnersViewTreeParams): boolean {
    if (!searchValue) {
      return true;
    }

    const { firstName, lastName, login } = params.partner;
    return this.isIncludedTextInPartnersSearch(firstName) || this.isIncludedTextInPartnersSearch(lastName)
      || this.isIncludedTextInPartnersSearch(String(login));
  }

  selectLevel(level: PartnersCollapseFilterValue): void {
    void this.$emit(PartnersCollapseEvent.update, level);
    void this.$emit(PartnersCollapseEvent.changeLevel, level);
  }

  changePartnersSearch(value: string): void {
    this.partnersSearch = value;
    this.elTree.filter(value);
  }

  collapseAllAccordions(): void {
    this.isBranchesAllExpanded = false;
  }

  expandAllAccordions(): void {
    if (this.hasOnlyBranchesLevel) {
      return;
    }

    this.isBranchesAllExpanded = true;
  }

  displayedText(partnersInTree: number): string {
    return `${this.textAttributes.more} ${partnersInTree}`;
  }
}
