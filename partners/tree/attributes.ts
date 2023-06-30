import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-tree';

export enum PartnersTreeTextAttribute {
  branch = 'Ветка',
  attach = 'Прикрепить',
  placeHere = 'Разместить сюда',
  notOpen = 'Не открыта'
}

export enum PartnersTreeTestLocator {
  //
}

export const dtPartnersTree = getTestSelectors(COMPONENT_NAME, PartnersTreeTestLocator);
