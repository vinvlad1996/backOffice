import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { PartnerDataModal } from './index';
import { shopRepo, userRepo } from '~/shared/repository/fake-services-factory';
import { fakeUserInfoExtended } from '~/shared/repository/fixtures/fake-user-info-extended';
import { fakeShop } from '~/shared/repository/fixtures/shop';
import { mainAvailableAccountAddress } from '~/shared/repository/fixtures/available-account-addresses';

export default {
  title: 'Components / Partners / PartnerDataModal',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=8850%3A336685&t=VwGEVMKjHmZ2KQBA-0'
    }
  }
};

export const Default = (): Component => create();

function create() {
  userRepo.UPDATE_USER_INFO_EXTENDED(fakeUserInfoExtended());
  shopRepo.UPDATE_SHOP_DATA(fakeShop);
  shopRepo.UPDATE_ADDRESS_ID(mainAvailableAccountAddress().id);

  return {
    components: {
      PartnerDataModal
    },
    data() {
      return {
        isVisible: true
      };
    },
    template: `
      <partner-data-modal
        :is-visible="isVisible"
      />
    `
  };
}
