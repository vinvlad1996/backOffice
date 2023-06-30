import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { PartnersCollapse } from './index';
import { fakeViewTreeResponse } from '~/shared/repository/fixtures/fake-view-tree';

export default {
  title: 'Components / Partners',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=10160%3A416540&t=lDrrMLTxiYB676eF-4'
    }
  }
};

export const CollapseDefault = (): Component => create();

function create() {
  return {
    components: {
      PartnersCollapse
    },
    data() {
      return {
        viewTreeResponse: fakeViewTreeResponse()
      };
    },
    template: '<partners-collapse :view-tree-response="viewTreeResponse" />'
  };
}
