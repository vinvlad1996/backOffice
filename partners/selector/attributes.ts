import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-selector';

export enum PartnersSelectorTextAttribute {
  attach = 'Прикрепить'
}

export enum PartnersSelectorTestLocator {
  login = 'login',
  goStatus = 'go-status',
  rankTitle = 'rank-title',
  button = 'button',
  fio = 'fio',
  uiRadioButton = 'ui-radio-button'
}

export const dtPartnersSelector = getTestSelectors(COMPONENT_NAME, PartnersSelectorTestLocator);
