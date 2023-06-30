import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { COMPONENT_NAME, PartnersInfoTextAttribute, PartnersInfoTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import Icon from '~/shared/utils/icon-mixin';

@Component({
  name: COMPONENT_NAME
})
export default class extends mixins(TestId, Translatable, Icon) {
  @Prop({
    type: Number,
    required: true
  }) readonly login: number;

  @Prop({
    type: String,
    required: true
  }) readonly firstName: string;

  @Prop({
    type: String,
    default: ''
  }) readonly lastName: string;

  readonly textAttributes = this.transAll(PartnersInfoTextAttribute);
  readonly testLocators = PartnersInfoTestLocator;
}
