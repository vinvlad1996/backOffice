import { getTestSelectors } from '~/shared/utils/unit-test/test-id';

export const COMPONENT_NAME = 'partners-switch-banner';

export enum PartnersSwitchBannerTextAttribute {
  bannerTitle = 'Быстрый переходБыстрый переходБыстрый переход',
  bannerDescription = 'быстрый переход к крайнему левому свободному месту'
}

export enum PartnersSwitchBannerTestLocator {
  title = 'title',
  changeValue = 'change-value',
  description = 'description'
}

export const dtPartnersSwitchBanner = getTestSelectors(COMPONENT_NAME, PartnersSwitchBannerTestLocator);
