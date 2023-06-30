import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { fakeBranchInfo } from '~/shared/repository/fixtures/fake-branch-info';
import { PartnersAttachmentDialog } from './index';

export default {
  title: 'Components / Partners',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=13984%3A280124'
    }
  }
};

export const AttachmentDialog = (): Component => create();

function create() {
  return {
    components: {
      PartnersAttachmentDialog
    },
    data() {
      return {
        isVisible: true,
        branchInfo: fakeBranchInfo()
      };
    },
    template: `
      <partners-attachment-dialog
        :is-visible="isVisible"
        :branch-info="branchInfo"
      />
    `
  };
}
