import { Component, Prop, mixins } from 'nuxt-property-decorator';
import { orderBy } from 'lodash';
import { isValid, format } from 'date-fns';
import { COMPONENT_NAME, PartnersListTextAttribute, PartnersListTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { uiButton } from '~/components/ui';
import { UiButtonSize, UiButtonView } from '~/components/ui/button/component';
import { PartnersCandidateForLinking } from '../model';
import { invitePartnerRoute } from '~/shared/repository/routes/invite';
import { getTeamAttachingPartnersByIdFirstStepRoute } from '~/shared/repository/routes/team';
import { EXTERNAL_CURRENCY } from '~/static-data/common-text-attributes';
import { getDateFnsLocale } from '~/shared/utils/get-date-fns-locale';
import { UiDividerColor, UiDividerOrientation } from '~/components/ui/divider/component';
import { uiDivider } from '~/components/ui/divider';

@Component({
  name: COMPONENT_NAME,
  components: {
    uiButton,
    uiDivider
  }
})
export default class extends mixins(TestId, Translatable) {
  @Prop({
    type: Array,
    required: true
  }) readonly candidates: PartnersCandidateForLinking[];

  readonly textAttributes = this.transAll(PartnersListTextAttribute);
  readonly testLocators = PartnersListTestLocator;

  readonly uiDividerOrientation = UiDividerOrientation;
  readonly uiDividerColor = UiDividerColor;

  readonly projectRepo = this.$projectServices.projectRepository;
  readonly userRepo = this.$projectServices.userRepo;
  readonly notifier = this.$projectServices.notifier;

  readonly uiButtonSize = UiButtonSize;
  readonly uiButtonView = UiButtonView;

  readonly invitePartnerRoute = invitePartnerRoute();

  readonly externalCurrency = EXTERNAL_CURRENCY;

  get languageCode(): string {
    return this.userRepo.languageCode;
  }

  get sortedCandidates(): PartnersCandidateForLinking[] {
    return orderBy(this.candidates, 'activationDate', 'desc');
  }

  displayedActivationDate(activationDate: string): string {
    const currentDate = new Date(activationDate);
    const isCurrentDateValid = isValid(currentDate);

    if (!isCurrentDateValid || !activationDate) {
      return this.textAttributes.invalidDate;
    }

    return format(currentDate, 'dd.LL.yyyy hh:mm', { locale: getDateFnsLocale(this.languageCode) });
  }

  buttonView(index: number): UiButtonView {
    return !index ? this.uiButtonView.action : this.uiButtonView.extra;
  }

  attachPartner(login: number): void {
    void this.$router.push(getTeamAttachingPartnersByIdFirstStepRoute(String(login)));
  }
}
