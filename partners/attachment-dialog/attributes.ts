import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-attachment-dialog';

export enum PartnersAttachmentDialogTextAttribute {
  title = 'Прикрепление к ветке ',
  bannerTitle = 'Преварительный расчет*',
  turnover = 'Оборот',
  writeOffBigBranch = 'Списание с большой ветки',
  groupBonus = 'Групповой бонус',
  balance = 'Остаток',
  comment = '*Возможен пересчет бонуса и оборотов при отмене покупок либо одновременном прикреплении других партнеров.',
  buttonDone = 'Подтвердить',
  branch = 'Ветка',
  miniBranch = 'малая',
  bigBranch = 'большая',
  rub = '₽'
}

export enum PartnersAttachmentDialogTestLocator {
  name = 'name',
  login = 'login',
  bannerTitle = 'banner-title',
  blockBranchInfo = 'block-branch-info',
  turnover = 'turnover',
  branchTurnover = 'branch-turnover',
  blockWriteOff = 'block-write-off',
  writeOffText = 'write-off-text',
  writeOff = 'write-off',
  blockBonus = 'block-bonus',
  bonusText = 'bonus-text',
  bonus = 'bonus',
  blockBalance = 'block-balane',
  balanceText = 'balance-text',
  balance = 'balance',
  comment = 'comment',
  confirmationButton = 'confirmation-button'
}

export const dtPartnersAttachmentDialog = getTestSelectors(COMPONENT_NAME, PartnersAttachmentDialogTestLocator);
