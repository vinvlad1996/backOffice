import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { fakeBranchInfo } from '~/shared/repository/fixtures/fake-branch-info';
import { fakeHierarchyToTopDataList, fakeHierarchyToTopPartnerStart } from '~/shared/repository/fixtures/fake-hierarchy';
import { PartnersConnectionsDialog } from './index';

export default {
  title: 'Components / Partners',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=13984%3A279642'
    }
  }
};

export const ConnectionsDialog = (): Component => create();

function create() {
  return {
    components: {
      PartnersConnectionsDialog
    },
    data() {
      return {
        isVisible: true,
        partnerStartData: fakeHierarchyToTopPartnerStart(),
        hierarchy: fakeHierarchyToTopDataList(),
        branchInfo: fakeBranchInfo()
      };
    },
    template: `
      <partners-connections-dialog
        :is-visible="isVisible"
        :partner-start-data="partnerStartData"
        :hierarchy="hierarchy"
        :branch-info="branchInfo"
      />
    `
  };
}
