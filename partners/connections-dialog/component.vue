<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <ui-dialog
    :show-close="true"
    :visible="isVisible"
    :append-to-body="true"
    :view="uiDialogView.fullscreen"
    :title="textAttributes.title"
    :class="b('dialog')"
    @close="onClose"
  >
    <div
      :class="b()"
      :data-test="tid()"
    >
      <div
        :class="b('start-partner')"
        :data-test="tid(testLocators.blockStartPartner)"
      >
        <div
          :class="b('branch')"
          :data-test="tid(testLocators.branchInfo)"
        >
          <b>{{ textAttributes.branch }} {{ branchNumber }}</b>
          <span :data-test="tid(testLocators.branchSize)">
            {{ displayedBranchSize }}
          </span>
        </div>

        <div
          :class="b('partner-data')"
          :data-test="tid(testLocators.blockPartnerInfo)"
        >
          <div
            :class="b('login')"
            :data-test="tid(testLocators.login)"
          >
            <b>{{ loginPartner }}</b>
          </div>
          <div
            :class="b('go-status')"
            :data-test="tid(testLocators.goStatus)"
          >
            {{ goStatusPartner }}
            {{ externalCurrency }}
          </div>
          <div
            :class="b('rank-title')"
            :data-test="tid(testLocators.rank)"
          >
            {{ rankTitle }}
          </div>
        </div>
        <div
          :class="b('name-partner')"
          :data-test="tid(testLocators.partnerName)"
        >
          {{ displayedPartnerName }}
        </div>
      </div>

      <div :class="b('container')">
        <div>
          <ul
            :class="b('hierarchy-list')"
            :data-test="tid(testLocators.list)"
          >
            <li
              v-for="(item, index) in hierarchy"
              :key="index"
              :class="b('item')"
              :data-test="tid(testLocators.item)"
            >
              <div
                :class="b('login')"
                :data-test="tid(testLocators.hierarchyLogin)"
                v-html="item.login"
              />
              <div
                :class="b('item-name')"
                :data-test="tid(testLocators.hierarchyName)"
              >
                {{ item.firstName }}
                {{ item.lastName }}
              </div>
              <div
                :class="b('item-goStatus')"
                :data-test="tid(testLocators.hierarchyGoStatus)"
              >
                {{ item.goStatus }} {{ externalCurrency }}
              </div>

              <ui-icon-base :name="iconName.sponsor" />

              <div
                :class="b('sponsor-id')"
                :data-test="tid(testLocators.sponsorId)"
              >
                {{ idSponsor }}
              </div>
              <div
                :class="b('name-sponsor')"
                :data-test="tid(testLocators.sponsorName)"
              >
                {{ displayedSponsorName }}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div :class="b('footer')">
        <div :class="b('last-partner')">
          <div :class="b('login-last-partner')">
            <b>{{ loginPartner }}</b>
          </div>
          <div
            :class="b('go-status')"
          >
            {{ goStatusPartner }}
            {{ externalCurrency }}
          </div>
          <div
            :class="b('rank-title')"
          >
            {{ rankTitle }}
          </div>
        </div>
        <div
          :class="b('name-last-partner')"
        >
          {{ displayedPartnerName }}
        </div>

        <ui-divider
          :orientation="uiDividerOrientation.default"
          :color="uiDividerColor.basicGrey"
          :is-expanded="true"
        />

        <partners-info
          :class="b('partners-info')"
          :login="idSponsor"
          :first-name="firstNamePartner"
          :last-name="lastNamePartner"
        />
      </div>
    </div>
  </ui-dialog>
</template>
