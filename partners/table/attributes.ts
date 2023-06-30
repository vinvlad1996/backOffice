import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-table';

export enum PartnersTableTextAttribute {
  yes = 'да',
  no = 'нет',
  branch = 'ветка',
  beginningOfBranch = 'Начало ветки',
  people = 'Людей',
  fromSponsor = 'От спонсоров',
  firstLevel = '1 уровень',
  activity = 'Активность:',
  savedVolumeText = 'Сохраненный объем',
  volumeInCurrentPeriodText = 'Объем в текущем периоде с',
  groupBonusText = 'Групповой бонус',
  tradeTurnoverText = 'Товарооборот',
  select = 'Выбрать',
  small = 'малая',
  treeInMarketingPlan = 'О Дереве в Маркетинг плане'
}

export enum PartnersTableTestLocator {
  elTable = 'el-table',
  elTableColumn = 'el-table-column',
  button = 'button',
  text = 'text'
}

export const dtPartnersTable = getTestSelectors(COMPONENT_NAME, PartnersTableTestLocator);
