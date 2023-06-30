<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <div
    :class="b({ active: isQuickTransition })"
    :data-test="tid()"
  >
    <div :class="b('wrapper')">
      <div
        :class="b('title')"
        :data-test="tid(testLocators.title)"
      >
        {{ textAttributes.bannerTitle }}
      </div>

      <ui-checkbox-single
        :value="isQuickTransition"
        :type="uiCheckboxType.switch"
        :data-test="tid(testLocators.changeValue)"
        @change="change"
      />
    </div>

    <div
      :class="b('description')"
      :data-test="tid(testLocators.description)"
    >
      {{ textAttributes.bannerDescription }}
    </div>
  </div>
</template>
