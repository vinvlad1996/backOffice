import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-connections-dialog';

export enum PartnersConnectionsDialogTextAttribute {
  title = 'Связи',
  branch = 'Ветка',
  miniBranch = 'малая',
  bigBranch = 'большая'
}

export enum PartnersConnectionsDialogTestLocator {
  blockStartPartner = 'block-start-partner',
  branchInfo = 'branch-info',
  branchSize = 'branch-size',
  blockPartnerInfo = 'block-partner-info',
  login = 'login',
  goStatus = 'go-status',
  rank = 'rank',
  partnerName = 'partner-name',
  list = 'list',
  item = 'item',
  hierarchyLogin = 'hierarchy-login',
  hierarchyName = 'hierarchy-name',
  hierarchyGoStatus = 'hierarchy-go-status',
  sponsorId = 'sponsor-id',
  sponsorName = 'sponsor-name'
}

export const dtPartnersConnectionsDialog = getTestSelectors(COMPONENT_NAME, PartnersConnectionsDialogTestLocator);
