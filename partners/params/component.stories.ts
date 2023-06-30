import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { PartnersParams } from './index';
import { PartnersParamsDisplay } from './component';
import { fakeLastBranchPartner } from '~/shared/repository/fixtures/fake-last-branch-partner';

export default {
  title: 'Components / Partners / Params',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=13984%3A280030'
    }
  }
};

export const Default = (): Component => create();
export const WithoutSponsorFio = (): Component => create({ hasSponsorFio: false });
export const ColumnDisplay = (): Component => create();
export const RowDisplay = (): Component => create({ display: PartnersParamsDisplay.row });

function create(params = {}) {
  return {
    components: {
      PartnersParams
    },
    data() {
      return {
        partnerData: fakeLastBranchPartner(),
        hasSponsorFio: true,
        display: PartnersParamsDisplay.column,
        ...params
      };
    },
    template: `
      <div style="padding: 20px;">
        <partners-params
          :partner-data="partnerData"
          :has-sponsor-fio="hasSponsorFio"
          :display="display"
        />
      </div>
    `
  };
}
