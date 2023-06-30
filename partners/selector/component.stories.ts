import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { PartnersSelector } from './index';
import { fakeLastBranchPartner } from '~/shared/repository/fixtures/fake-last-branch-partner';
import { fakePartnersBranchRegular } from '~/shared/repository/fixtures/partners';

export default {
  title: 'Components / Partners / Selector',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=13984%3A280060'
    }
  }
};

export const Default = (): Component => create();
export const Selected = (): Component => create(fakeLastBranchPartner().login);

function create(partnerLogin = null) {
  return {
    components: {
      PartnersSelector
    },
    data() {
      const { startPartner } = fakePartnersBranchRegular();

      return {
        partnerLogin,
        partnerData: fakeLastBranchPartner(),
        partnerName: `${startPartner.firstName} ${startPartner.lastName}`
      };
    },
    template: `
      <partners-selector
        :partner-login.sync="partnerLogin"
        :partner-data="partnerData"
        :partner-name="partnerName"
      />
    `
  };
}
