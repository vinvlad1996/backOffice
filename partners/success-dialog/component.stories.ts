import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { fakeBranchInfo } from '~/shared/repository/fixtures/fake-branch-info';
import { PartnersSuccessDialog } from './index';

export default {
  title: 'Components / Partners',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=13984%3A280148'
    }
  }
};

export const SuccessDialog = (): Component => create();

function create() {
  return {
    components: {
      PartnersSuccessDialog
    },
    data() {
      return {
        isVisible: true,
        branchInfo: fakeBranchInfo()
      };
    },
    template: `
      <partners-success-dialog
        :is-visible="isVisible"
        :branch-info="branchInfo"
      />
    `
  };
}
