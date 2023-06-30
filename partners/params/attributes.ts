import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-params';

export enum PartnersParamsTextAttribute {
}

export enum PartnersParamsTestLocator {
  content = 'content',
  login = 'login',
  fio = 'fio',
  goStatus = 'go-status',
  rank = 'rank',
  sponsorFio = 'sponsor-fio'
}

export const dtPartnersParams = getTestSelectors(COMPONENT_NAME, PartnersParamsTestLocator);
