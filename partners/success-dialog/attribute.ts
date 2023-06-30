import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-success-dialog';

export enum PartnersSuccessDialogTextAttribute {
  title = 'Готово',
  description = 'прикреплен к Ветке',
  closeButton = 'Закрыть'
}

export enum PartnersSuccessDialogTestLocator {
  picture = 'picture',
  closeButton = 'close-button',
  description = 'description'
}

export const dtPartnersSuccessDialog = getTestSelectors(COMPONENT_NAME, PartnersSuccessDialogTestLocator);
