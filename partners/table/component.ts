import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { Route } from 'vue-router';
import { Table, TableColumn } from 'element-ui';
import { format } from 'date-fns';
import { isEmpty, sortBy } from 'lodash';
import { COMPONENT_NAME, PartnersTableTextAttribute, PartnersTableTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { uiButton } from '~/components/ui';
import { UiButtonView, UiButtonSize } from '~/components/ui/button/component';
import { PartnersBranchForAvailable, PartnersStartPartner } from '../model';
import { getDateFnsLocale } from '~/shared/utils/get-date-fns-locale';
import { EXTERNAL_CURRENCY } from '~/static-data/common-text-attributes';
import { FIXED_PARTNERS_BRANCH_TYPE } from '~/shared/repository/constants';
import { getTeamAttachingPartnersByIdSecondStepNumberRoute } from '~/shared/repository/routes/team';
import { RoutesName } from '~/shared/repository/routes/routes-name';
import { routes } from '~/shared/repository/routes';

export enum PartnersTableView {
  default = 'default',
  volume = 'volume'
}

export enum PartnersTableKey {
  groupBonus = 'groupBonus',
  tradeTurnover = 'tradeTurnover'
}

export enum PartnersTableItemView {
  default = 'default',
  bold = 'bold',
  danger = 'danger',
  button = 'button'
}

export enum PartnersTableItemType {
  default = 'default',
  striped = 'striped',
  stripedLong = 'striped-long',
  higher = 'higher'
}

export enum PartnersTableItemPosition {
  default = 'default',
  left = 'left'
}

export enum PartnersTableColumnName {
  startPartner = 'startPartner',
  peopleQuantity = 'peopleQuantity',
  peopleQuantityFromSponsor = 'peopleQuantityFromSponsor',
  peopleQuantityByFirstLevel = 'peopleQuantityByFirstLevel',
  activity = 'activity',
  activityOfCurrentMonth = 'activityOfCurrentMonth',
  activityOfNextMonth = 'activityOfNextMonth',
  volumeInCurrentPeriod = 'volumeInCurrentPeriod',
  groupBonus = 'groupBonus',
  tradeTurnover = 'tradeTurnover',
  savedVolume = 'savedVolume',
  buttonSelected = 'buttonSelected'
}

export enum PartnersTableColumnWidth {
  default = '110px',
  regular = '120px',
  extra = '150px'
}

const DEFAULT_COLUMN_KEY = 'branch';

export const DEFAULT_COLUMN_START_INDEX = 1;
export const DEFAULT_COLUMN_START_INDEX_WITH_PARTNER = 2;
export const QUANTITY_ROWS = 9;

export const PLACEHOLDER_TEXT = '-';

export const DEFAULT_ROW_SPAN = {
  default: 1
};
export const DEFAULT_COLUMN_SPAN = {
  default: 1,
  large: 3
};

@Component({
  name: COMPONENT_NAME,
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    uiButton
  }
})
export default class extends mixins(TestId, Translatable) {
  @Prop({
    type: String,
    validator: val => Object.values(PartnersTableView).includes(val),
    default: PartnersTableView.default
  }) readonly view: PartnersTableView;

  @Prop({
    type: Array,
    required: true
  }) readonly branches: PartnersBranchForAvailable[];

  readonly textAttributes = this.transAll(PartnersTableTextAttribute);
  readonly testLocators = PartnersTableTestLocator;

  readonly userRepo = this.$projectServices.userRepo;

  readonly uiButtonView = UiButtonView;
  readonly uiButtonSize = UiButtonSize;

  readonly currentDate = (): Date => new Date();
  readonly initialTableItemParams: PartnersTableParams = {
    text: '',
    view: PartnersTableItemView.default,
    type: PartnersTableItemType.default,
    position: PartnersTableItemPosition.default
  }

  get isBranchesEmpty(): boolean {
    return isEmpty(this.branches);
  }

  get isVolumeView(): boolean {
    return this.view === PartnersTableView.volume;
  }

  get languageCode(): string {
    return this.userRepo?.languageCode;
  }

  get currentYear(): number {
    return this.currentDate().getFullYear();
  }

  get currentMonthIndex(): number {
    return parseInt(format(new Date(), 'M')) - 1;
  }

  get beginningOfCurrentMonth(): string {
    return format(new Date(this.currentYear, this.currentMonthIndex, 1), 'd MMMM', { locale: getDateFnsLocale(this.languageCode) });
  }

  get userLogin(): string {
    return this.$route.params?.id;
  }

  get sortedBranches(): PartnersBranchForAvailable[] {
    return sortBy(this.branches, item => -item?.isBig);
  }

  get quantityOfEmptyBranches(): number {
    if (this.isBranchesEmpty) {
      return 0;
    }

    return this.sortedBranches.reduce((prev, currentBranch) => {
      return isEmpty(currentBranch) ? prev + 1 : 0;
    }, 0);
  }

  get quantityOfBranches(): number {
    if (this.isBranchesEmpty) {
      return 0;
    }

    return this.sortedBranches.length;
  }

  get quantityOfBranchesWithInitalColumn(): number {
    return this.quantityOfBranches + 1;
  }

  get areOfEmptyBranches(): boolean {
    if (this.isBranchesEmpty) {
      return true;
    }

    return this.quantityOfEmptyBranches === this.quantityOfBranches;
  }

  get tableData(): PartnersTableData[] {
    let tableData: PartnersTableData[] = [];

    let startPartner = this.getParamsForFirstTableItem(PartnersTableColumnName.startPartner);
    let peopleQuantity = this.getParamsForFirstTableItem(PartnersTableColumnName.peopleQuantity);
    let peopleQuantityFromSponsor = this.getParamsForFirstTableItem(PartnersTableColumnName.peopleQuantityFromSponsor);
    let peopleQuantityByFirstLevel = this.getParamsForFirstTableItem(
      PartnersTableColumnName.peopleQuantityByFirstLevel
    );
    let activity = this.getParamsForFirstTableItem(PartnersTableColumnName.activity);
    let activityOfCurrentMonth = this.getParamsForFirstTableItem(PartnersTableColumnName.activityOfCurrentMonth);
    let activityOfNextMonth = this.getParamsForFirstTableItem(PartnersTableColumnName.activityOfNextMonth);
    let volumeInCurrentPeriod = this.getParamsForFirstTableItem(PartnersTableColumnName.volumeInCurrentPeriod);
    let groupBonus = this.getParamsForFirstTableItem(PartnersTableColumnName.groupBonus);
    let tradeTurnover = this.getParamsForFirstTableItem(PartnersTableColumnName.tradeTurnover);
    let savedVolume = this.getParamsForFirstTableItem(PartnersTableColumnName.savedVolume);
    let buttonSelected = this.getParamsForFirstTableItem(PartnersTableColumnName.buttonSelected);

    for (let index = 0; index < this.quantityOfBranches; index++) {
      const element = this.sortedBranches[index];

      const isCurrentBranchEmpty = isEmpty(element);
      const startIndex = DEFAULT_COLUMN_START_INDEX_WITH_PARTNER + index;

      startPartner = {
        ...startPartner,
        ...this.getParamsForStartPartner(element, isCurrentBranchEmpty, startIndex)
      };

      peopleQuantity = {
        ...peopleQuantity,
        ...this.getParamsForCurrentTableItem({
          text: isCurrentBranchEmpty ? PLACEHOLDER_TEXT : element.peopleInStructure.total
        }, startIndex)
      };

      peopleQuantityFromSponsor = {
        ...peopleQuantityFromSponsor,
        ...this.getParamsForCurrentTableItem({
          text: isCurrentBranchEmpty ? PLACEHOLDER_TEXT : element.peopleInStructure.fromSponsor
        }, startIndex)
      };

      peopleQuantityByFirstLevel = {
        ...peopleQuantityByFirstLevel,
        ...this.getParamsForCurrentTableItem({
          text: isCurrentBranchEmpty ? PLACEHOLDER_TEXT : element.peopleInStructure.firstLevel
        }, startIndex)
      };

      activity = { ...activity, ...this.getParamsForCurrentTableItem({ text: null }, startIndex) };

      activityOfCurrentMonth = {
        ...activityOfCurrentMonth,
        ...this.getParamsForActivityOfCurrentMonth(element, isCurrentBranchEmpty, startIndex)
      };

      activityOfNextMonth = {
        ...activityOfNextMonth,
        ...this.getParamsForActivityOfNextMonth(element, isCurrentBranchEmpty, startIndex)
      };

      if (this.isVolumeView) {
        volumeInCurrentPeriod = {
          ...volumeInCurrentPeriod,
          ...this.getParamsForCurrentTableItem({ text: null }, startIndex)
        };

        groupBonus = {
          ...groupBonus,
          ...this.getParamsForCurrentTableItem({
            text: this.currentVolumeForTableItem(element, isCurrentBranchEmpty, PartnersTableKey.groupBonus)
          }, startIndex)
        };

        tradeTurnover = {
          ...tradeTurnover,
          ...this.getParamsForCurrentTableItem({
            text: this.currentVolumeForTableItem(element, isCurrentBranchEmpty, PartnersTableKey.tradeTurnover)
          }, startIndex)
        };
      }

      savedVolume = { ...savedVolume, ...this.getParamsForSavedVolume(element, isCurrentBranchEmpty, startIndex) };

      if (!this.isVolumeView) {
        buttonSelected = { ...buttonSelected, ...this.getParamsForButtonSelected(startIndex) };
      }
    }

    tableData = [
      startPartner,
      peopleQuantity,
      peopleQuantityFromSponsor,
      peopleQuantityByFirstLevel,
      activity,
      activityOfCurrentMonth,
      activityOfNextMonth
    ];

    if (this.isVolumeView) {
      tableData = [...tableData, volumeInCurrentPeriod, groupBonus, tradeTurnover, savedVolume];
    } else {
      tableData = [...tableData, savedVolume, buttonSelected];
    }

    return tableData;
  }

  get marketingRoute(): Partial<Route> {
    return routes[RoutesName.marketing];
  }

  getParamsForFirstTableItem(columnName: PartnersTableColumnName): PartnersTableData {
    const {
      beginningOfBranch, people, fromSponsor, firstLevel,
      activity: activityText, savedVolumeText, volumeInCurrentPeriodText,
      groupBonusText, tradeTurnoverText
    } = this.textAttributes;
    let tableItem: PartnersTableData = null;

    switch (columnName) {
      case PartnersTableColumnName.startPartner:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: beginningOfBranch,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.peopleQuantity:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: people,
            view: PartnersTableItemView.bold,
            type: PartnersTableItemType.striped,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.peopleQuantityFromSponsor:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: fromSponsor,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.peopleQuantityByFirstLevel:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: firstLevel,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.activity:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: activityText,
            view: PartnersTableItemView.bold,
            type: PartnersTableItemType.striped,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.activityOfCurrentMonth:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: this.nameOfMonth(new Date(this.currentYear, this.currentMonthIndex)),
            type: PartnersTableItemType.higher,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.activityOfNextMonth:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: this.nameOfMonth(new Date(this.currentYear, this.currentMonthIndex + 1)),
            type: PartnersTableItemType.higher,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.volumeInCurrentPeriod:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: `${volumeInCurrentPeriodText} ${this.beginningOfCurrentMonth}`,
            view: PartnersTableItemView.bold,
            type: PartnersTableItemType.stripedLong,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.groupBonus:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: groupBonusText,
            type: PartnersTableItemType.higher,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.tradeTurnover:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: tradeTurnoverText,
            type: PartnersTableItemType.higher,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.savedVolume:
        tableItem = {
          ...this.getParamsForCurrentTableItem({
            text: savedVolumeText,
            type: PartnersTableItemType.striped,
            position: PartnersTableItemPosition.left
          })
        };
        break;
      case PartnersTableColumnName.buttonSelected:
        tableItem = { ...this.getParamsForCurrentTableItem({ text: null, type: PartnersTableItemType.striped }) };
        break;
    }

    return { ...tableItem };
  }

  getParamsForStartPartner(
    element: PartnersBranchForAvailable, isCurrentBranchEmpty: boolean, index: number
  ): PartnersTableRow {
    let startPartnerData: PartnersStartPartner = null;

    if (!isCurrentBranchEmpty) {
      startPartnerData = { ...element.startPartner };
    }

    return {
      ...this.getParamsForCurrentTableItem({
        text: isCurrentBranchEmpty
          ? PLACEHOLDER_TEXT
          : `${startPartnerData?.login} <br/> ${startPartnerData?.firstName} <br/> ${startPartnerData?.lastName}`
      }, index)
    };
  }

  getParamsForActivityOfCurrentMonth(
    element: PartnersBranchForAvailable, isCurrentBranchEmpty: boolean, index: number
  ): PartnersTableRow {
    return {
      ...this.getParamsForCurrentTableItem({
        text: isCurrentBranchEmpty
          ? PLACEHOLDER_TEXT
          : this.convertBooleanToText(element.activity.currentMonth),
        view: isCurrentBranchEmpty
          ? PartnersTableItemView.default
          : this.currentViewForActivityItem(element.activity.currentMonth),
        type: PartnersTableItemType.higher
      }, index)
    };
  }

  getParamsForActivityOfNextMonth(
    element: PartnersBranchForAvailable, isCurrentBranchEmpty: boolean, index: number
  ): PartnersTableRow {
    return {
      ...this.getParamsForCurrentTableItem({
        text: isCurrentBranchEmpty ? PLACEHOLDER_TEXT : this.convertBooleanToText(element.activity.nextMonth),
        view: isCurrentBranchEmpty
          ? PartnersTableItemView.default
          : this.currentViewForActivityItem(element.activity.nextMonth),
        type: PartnersTableItemType.higher
      }, index)
    };
  }

  getParamsForSavedVolume(
    element: PartnersBranchForAvailable, isCurrentBranchEmpty: boolean, index: number
  ): PartnersTableRow {
    return {
      ...this.getParamsForCurrentTableItem({
        text: this.currentSavedVolumeForTableItem(element, isCurrentBranchEmpty, index),
        view: this.isCurrentBranchBig(element, index)
          ? PartnersTableItemView.bold
          : PartnersTableItemView.default
      }, index)
    };
  }

  getParamsForButtonSelected(index: number): PartnersTableRow {
    return {
      ...this.getParamsForCurrentTableItem({
        text: null,
        view: PartnersTableItemView.button,
        buttonView: this.currentButtonView(index)
      }, index)
    };
  }

  getParamsForCurrentTableItem(
    params: Partial<PartnersTableParams> = {}, index = DEFAULT_COLUMN_START_INDEX
  ): PartnersTableRow {
    return { [this.currentKey(index)]: { ...this.initialTableItemParams, ...params } };
  }

  getFirstBranch(row: PartnersTableRow): PartnersTableParams {
    return row[this.currentKey(DEFAULT_COLUMN_START_INDEX)];
  }

  currentKey(index: number): string {
    return `${DEFAULT_COLUMN_KEY}_${index}`;
  }

  currentColumnWidth(index: number): string {
    if (this.quantityOfBranches <= DEFAULT_COLUMN_START_INDEX_WITH_PARTNER) {
      return PartnersTableColumnWidth.extra;
    }

    return index === DEFAULT_COLUMN_START_INDEX ? PartnersTableColumnWidth.default : PartnersTableColumnWidth.regular;
  }

  currentViewForActivityItem(activity: boolean): PartnersTableItemView {
    return activity ? PartnersTableItemView.default : PartnersTableItemView.danger;
  }

  currentButtonView(index: number): UiButtonView {
    if (this.areOfEmptyBranches) {
      return index === DEFAULT_COLUMN_START_INDEX_WITH_PARTNER ? UiButtonView.action : UiButtonView.extra;
    }

    return index === this.quantityOfBranchesWithInitalColumn ? UiButtonView.action : UiButtonView.extra;
  }

  currentVolumeForTableItem(
    item: PartnersBranchForAvailable, isCurrentBranchEmpty: boolean, key: PartnersTableKey
  ): string {
    if (isCurrentBranchEmpty) {
      return PLACEHOLDER_TEXT;
    }

    const { value } = item[key];
    return value ? `${value} ${EXTERNAL_CURRENCY}` : PLACEHOLDER_TEXT;
  }

  currentSavedVolumeForTableItem(
    item: PartnersBranchForAvailable, isCurrentBranchEmpty: boolean, index: number
  ): string {
    if (isCurrentBranchEmpty) {
      return PLACEHOLDER_TEXT;
    }

    if (this.isCurrentBranchBig(item, index)) {
      return `${item.savedVolume.value} ${EXTERNAL_CURRENCY}`;
    }

    return this.textAttributes.small;
  }

  tableRowClassName({ row }: { row: PartnersTableRow }): PartnersTableItemType {
    const firstBranch = this.getFirstBranch(row);

    if (firstBranch.type === PartnersTableItemType.higher) {
      return PartnersTableItemType.higher;
    }

    return firstBranch.type === PartnersTableItemType.default
      ? PartnersTableItemType.default
      : PartnersTableItemType.striped;
  }

  tableRowAndColumnSpan({ row }: { row: PartnersTableRow }): number[] {
    const firstBranch = this.getFirstBranch(row);

    if (firstBranch.type === PartnersTableItemType.stripedLong) {
      return [DEFAULT_ROW_SPAN.default, DEFAULT_COLUMN_SPAN.large];
    }

    return [DEFAULT_ROW_SPAN.default, DEFAULT_COLUMN_SPAN.default];
  }

  isCurrentBranchBig(item: PartnersBranchForAvailable, index: number): boolean {
    return item?.isBig && index === DEFAULT_COLUMN_START_INDEX_WITH_PARTNER;
  }

  isButtonView(view: PartnersTableItemView): boolean {
    return view === PartnersTableItemView.button;
  }

  isColumnFixed(index: number): boolean {
    if (this.isVolumeView) {
      return false;
    }

    return this.quantityOfBranches > DEFAULT_COLUMN_START_INDEX_WITH_PARTNER && index === DEFAULT_COLUMN_START_INDEX;
  }

  nameOfMonth(date: Date): string {
    return format(date, 'LLLL', { locale: getDateFnsLocale(this.languageCode) });
  }

  convertBooleanToText(payload: boolean): string {
    return payload ? this.textAttributes.yes : this.textAttributes.no;
  }

  displayedLabel(index: number): string {
    return index === DEFAULT_COLUMN_START_INDEX ? null : `${index - 1} ${this.textAttributes.branch}`;
  }

  selectBranch(branchNumber: number): void {
    const currentBranch = this.sortedBranches[branchNumber - DEFAULT_COLUMN_START_INDEX_WITH_PARTNER];
    const activity = isEmpty(currentBranch) || !currentBranch?.savedVolume.value
      ? FIXED_PARTNERS_BRANCH_TYPE
      : String(currentBranch.savedVolume.value);

    void this.$router.push(
      getTeamAttachingPartnersByIdSecondStepNumberRoute({
        id: this.userLogin,
        step: String(branchNumber - DEFAULT_COLUMN_START_INDEX),
        activity,
        partnerLogin: String(currentBranch.startPartner.login)
      })
    );
  }
}

export interface PartnersTableData {
  [t: string]: PartnersTableParams
}

export interface PartnersTableParams {
  text: string | number
  view: PartnersTableItemView
  type: PartnersTableItemType
  position: PartnersTableItemPosition
  buttonView?: UiButtonView
}

export type PartnersTableRow = Record<string, PartnersTableParams>;
