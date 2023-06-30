<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <ui-dialog
    :show-close="true"
    :visible="isVisible"
    :title="displayedTitle"
    :class="b('dialog')"
    top="15vh"
    @close="onClose"
  >
    <div
      :class="b()"
      :data-test="tid()"
    >
      <div
        :class="b('login')"
        :data-test="tid(testLocators.login)"
      >
        ID {{ partnerLogin }}
      </div>
      <div
        :class="b('partner-name')"
        :data-test="tid(testLocators.name)"
      >
        {{ firstNamePartner }}
        {{ lastNamePartner }}
      </div>

      <div :class="b('banner')">
        <div
          :class="b('banner-title')"
          :data-test="tid(testLocators.bannerTitle)"
        >
          {{ textAttributes.bannerTitle }}
        </div>

        <div
          :class="b('block')"
          :data-test="tid(testLocators.blockBranchInfo)"
        >
          <div
            :class="b('item')"
            :data-test="tid(testLocators.turnover)"
          >
            {{ textAttributes.turnover }}
          </div>
          <div
            :class="b('content')"
            :data-test="tid(testLocators.branchTurnover)"
          >
            <span><b>{{ displayedTurnover }}</b></span>
            {{ displayedBranchSize }}
          </div>
        </div>

        <div
          :class="b('block')"
          :data-test="tid(testLocators.blockWriteOff)"
        >
          <div
            :class="b('item')"
            :data-test="tid(testLocators.writeOffText)"
          >
            {{ textAttributes.writeOffBigBranch }}
          </div>
          <div
            :class="b('content')"
            :data-test="tid(testLocators.writeOff)"
          >
            {{ displayedWriteOff }}
          </div>
        </div>

        <div
          :class="b('block')"
          :data-test="tid(testLocators.blockBonus)"
        >
          <div
            :class="b('item')"
            :data-test="tid(testLocators.bonusText)"
          >
            {{ textAttributes.groupBonus }}
          </div>
          <div
            :class="b('content')"
            :data-test="tid(testLocators.bonus)"
          >
            {{ displayedGroupBonus }}
          </div>
        </div>

        <div
          :class="b('block')"
          :data-test="tid(testLocators.blockBalance)"
        >
          <div
            :class="b('item')"
            :data-test="tid(testLocators.balanceText)"
          >
            {{ textAttributes.balance }}
          </div>
          <div
            :class="b('content')"
            :data-test="tid(testLocators.balance)"
          >
            {{ displayedBalance }}
          </div>
        </div>
      </div>

      <div
        :class="b('comment')"
        :data-test="tid(testLocators.comment)"
      >
        {{ textAttributes.comment }}
      </div>

      <ui-button
        :is-expanded="true"
        :size="uiButtonSize.xl"
        :view="uiButtonView.action"
        :data-test="tid(testLocators.confirmationButton)"
        @click="onConfirmation"
      >
        {{ textAttributes.buttonDone }}
      </ui-button>
    </div>
  </ui-dialog>
</template>
