import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-list';

export enum PartnersListTextAttribute {
  activation = 'Активация',
  goStatus = 'GO-статус',
  volume = 'Объем',
  attach = 'Прикрепить',
  invalidDate = 'Невалидная дата'
}

export enum PartnersListTestLocator {
  list = 'list',
  items = 'items',
  title = 'title',
  date = 'date',
  name = 'name',
  blockStatus = 'block-status',
  status = 'status',
  blockSize = 'block-size',
  size = 'size',
  inviteLink = 'invite-link',
  attachButton = 'attach-button'
}

export const dtPartnersList = getTestSelectors(COMPONENT_NAME, PartnersListTestLocator);
