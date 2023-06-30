import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-collapse';

export enum PartnersCollapseTextAttribute {
  placeholder = 'Поиск',
  expandBranch = 'Развернуть ветку',
  collapseAll = 'Свернуть все',
  expandAll = 'Развернуть все',
  more = 'еще',
  emptyData = 'Данные отсутствуют'
}

export enum PartnersCollapseTestLocator {
  searchBlock = 'search-block',
  searchInput = 'search-input',
  configuration = 'configuration',
  configurationTitle = 'configuration-title',
  configurationLevels = 'configuration-levels',
  tree = 'tree',
  treeContent = 'tree-content',
  treePartnerLogin = 'tree-partner-login',
  treePartnerFio = 'tree-partner-fio',
  treePartnerGpv = 'tree-partner-gpv',
  treeText = 'tree-text'
}

export const dtPartnersCollapse = getTestSelectors(COMPONENT_NAME, PartnersCollapseTestLocator);
