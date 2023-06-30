import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { PartnersTree } from './index';
import { fakeLastBranchPartner } from '~/shared/repository/fixtures/fake-last-branch-partner';

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

export const Tree = (): Component => create();

function create() {
  return {
    components: {
      PartnersTree
    },
    data() {
      return {
        partnerData: fakeLastBranchPartner(),
        selectedBranchNumber: null
      };
    },
    template: `
      <div style="padding: 20px 0; background-color: #f2f1ed;">
        <partners-tree
          :partner-data="partnerData"
          :branch-number.sync="selectedBranchNumber"
        />
      </div>
    `
  };
}
