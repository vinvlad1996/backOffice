import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partner-data-modal';

export enum PartnerDataModalTextAttribute {
  id = 'ID',
  levelTitle = 'уровень',
  branch = 'ветка',
  currentQualificationTitle = 'Текущая квалификация',
  goStatusTitle = 'GO-статус',
  sponsorTitle = 'Спонсор'
}

export enum PartnerDataModalTestLocator {
  photo = 'photo',
  profileName = 'profile-name',
  branch = 'branch',
  level = 'level',
  divider = 'divider',
  text = 'text',
  goStatus = 'go-status',
  qualification = 'qualification',
  sponsor = 'sponsor',
  login = 'login'
}

export const dtPartnerDataModal = getTestSelectors(COMPONENT_NAME, PartnerDataModalTestLocator);
