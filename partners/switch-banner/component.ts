import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { COMPONENT_NAME, PartnersSwitchBannerTextAttribute, PartnersSwitchBannerTestLocator } from './attributes';
import TestId from '~/shared/utils/unit-test/test-id';
import { Translatable } from '~/components/shared/translatable';
import { uiCheckboxSingle } from '~/components/ui';
import { UiCheckboxType, UiCheckboxView } from '~/components/ui/checkbox/base';

export enum PartnersSwitchBannerEvent {
  update = 'update:is-quick-transition'
}

@Component({
  name: COMPONENT_NAME,
  components: {
    uiCheckboxSingle
  }
})

export default class extends mixins(TestId, Translatable) {
  @Prop({
    type: Boolean,
    required: true
  }) readonly isQuickTransition: boolean;

  readonly textAttributes = this.transAll(PartnersSwitchBannerTextAttribute);
  readonly testLocators = PartnersSwitchBannerTestLocator;

  readonly uiCheckboxView = UiCheckboxView;
  readonly uiCheckboxType = UiCheckboxType;

  change(isQuickTransition: boolean): void {
    this.$emit(PartnersSwitchBannerEvent.update, isQuickTransition);
  }
}
