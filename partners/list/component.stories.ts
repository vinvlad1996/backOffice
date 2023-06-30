import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { fakeForLinkingPartnersList } from '~/shared/repository/fixtures/fake-for-linking-partners';
import { PartnersList } from './index';

export default {
  title: 'Components / Partners',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=13984%3A279611'
    }
  }
};

export const List = (): Component => create();

function create() {
  return {
    components: {
      PartnersList
    },
    data() {
      return {
        candidates: fakeForLinkingPartnersList()
      };
    },
    template: `
      <div style="padding: 20px;">
        <partners-list :candidates="candidates" />
      </div>
    `
  };
}
