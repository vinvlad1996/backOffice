import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { isEmpty } from 'lodash';
import { COMPONENT_NAME, PartnersSponsorInfoTextAttribute, PartnersSponsorInfoTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { PartnersSponsor } from '../model';
import Icon from '~/shared/utils/icon-mixin';

@Component({
  name: COMPONENT_NAME
})
export default class extends mixins(TestId, Translatable, Icon) {
  @Prop({
    type: Object,
    required: true
  }) readonly sponsor: PartnersSponsor;

  readonly textAttributes = this.transAll(PartnersSponsorInfoTextAttribute);
  readonly testLocators = PartnersSponsorInfoTestLocator;

  get hasSponsor(): boolean {
    return !isEmpty(this.sponsor);
  }

  get displayedLogin(): number {
    return this.hasSponsor ? this.sponsor.login : null;
  }

  get displayedFio(): string {
    return this.hasSponsor ? `${this.sponsor.firstName} ${this.sponsor.lastName}` : '';
  }
}
