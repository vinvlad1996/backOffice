import { withDesign } from 'storybook-addon-designs';
import { Component } from 'vue';
import { PartnersTable } from './index';
import { fakeAvailableBranchesListOfFirstBranchResponse, fakeAvailableBranchesListResponse, fakeAvailableBranchesListWithoutPartnersResponse } from '~/shared/repository/fixtures/fake-available-branches-list';
import { PartnersTableView } from './component';

export default {
  title: 'Components / Partners / Table',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HWbk9UtUKEWfaa76GgeWuC/%D0%91%D1%8D%D0%BA-%D0%BE%D1%84%D0%B8%D1%81-APL?node-id=13984%3A279740'
    }
  }
};

export const WithoutPartners = (): Component => create({
  branches: fakeAvailableBranchesListWithoutPartnersResponse().branches
});
export const WithFirstPartner = (): Component => create({
  branches: fakeAvailableBranchesListOfFirstBranchResponse().branches
});
export const DefaultView = (): Component => create({ view: PartnersTableView.default });
export const VolumeView = (): Component => create({ view: PartnersTableView.volume });

function create(params = {}) {
  return {
    components: {
      PartnersTable
    },
    data() {
      return {
        view: PartnersTableView.default,
        branches: fakeAvailableBranchesListResponse().branches,
        ...params
      };
    },
    template: `
      <div style="padding: 20px;">
        <partners-table
          :view="view"
          :branches="branches"
        />
      </div>
    `
  };
}
