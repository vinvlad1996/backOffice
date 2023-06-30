import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { PartnersInfo } from './index';
import { fakePartnersSponsor } from '~/shared/repository/fixtures/partners';

export default {
  title: 'Components / Partners',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=13984%3A279661'
    }
  }
};

export const Info = (): Component => create();

function create() {
  return {
    components: {
      PartnersInfo
    },
    data() {
      const { login, firstName, lastName } = fakePartnersSponsor();

      return {
        login,
        firstName,
        lastName
      };
    },
    template: `
      <div style="padding: 20px; background-color: #f2f1ed;">
        <partners-info
          :login="login"
          :first-name="firstName"
          :last-name="lastName"
        />
      </div>
    `
  };
}
