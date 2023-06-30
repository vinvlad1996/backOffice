import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-info';

export enum PartnersInfoTextAttribute {
  //
}

export enum PartnersInfoTestLocator {
  login = 'login',
  fio = 'fio'
}

export const dtPartnersInfo = getTestSelectors(COMPONENT_NAME, PartnersInfoTestLocator);
