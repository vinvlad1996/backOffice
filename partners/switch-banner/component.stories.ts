import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { PartnersSwitchBanner } from './index';

export default {
  title: 'Components / Partners',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=887%3A32480'
    }
  }
};

export const SwitchBanner = (): Component => create();

function create() {
  return {
    components: {
      PartnersSwitchBanner
    },
    data() {
      return {
        isQuickTransition: false
      };
    },
    template: `
      <div style="padding: 20px;">
        <partners-switch-banner :is-quick-transition.sync="isQuickTransition" />
      </div>
    `
  };
}
