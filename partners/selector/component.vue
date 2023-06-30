<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <div
    :class="b({ active: isActive })"
    :data-test="tid()"
  >
    <div :class="b('top')">
      <ui-radio
        name="radio"
        :model-value="partnerLogin"
        :value="partnerData.login"
        :data-test="tid(testLocators.uiRadioButton)"
        @change="selected"
      />

      <div
        :class="b('text', { colored: true })"
        :data-test="tid(testLocators.login)"
      >
        {{ partnerData.login }}
      </div>

      <div
        :class="b('text')"
        :data-test="tid(testLocators.goStatus)"
      >
        {{ displayedGoStatus }}
      </div>

      <div
        :class="b('text')"
        :data-test="tid(testLocators.rankTitle)"
      >
        {{ displayedRankTitle }}
      </div>
    </div>

    <template v-if="isActive">
      <partners-tree :partner-data="partnerData" />

      <div :class="b('wrapper')">
        <uiButton
          :view="uiButtonView.action"
          :size="uiButtonSize.xl"
          :is-expanded="true"
          :data-test="tid(testLocators.button)"
          @click="attach"
        >
          {{ displayedButtonText }}
        </uiButton>
      </div>
    </template>

    <div
      v-else
      :class="b('content')"
    >
      <div
        :class="b('text', { bold: true })"
        :data-test="tid(testLocators.fio)"
      >
        {{ partnerData.firstName }} {{ partnerData.lastName }}
      </div>
    </div>
  </div>
</template>
