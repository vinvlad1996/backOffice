<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <ui-dialog
    :show-close="true"
    :visible="isVisible"
    :title="textAttributes.title"
    :class="b('dialog')"
    @close="onClose"
  >
    <div
      :class="b()"
      :data-test="tid()"
    >
      <div :class="b('picture')">
        <img
          :class="b('success-dialog-picture')"
          :data-test="tid(testLocators.picture)"
          :src="picture"
          alt="#"
        >
      </div>
      <div
        :class="b('description')"
        :data-test="tid(testLocators.description)"
      >
        {{ displayedDescription }}
      </div>
      <ui-button
        :class="b('button')"
        :data-test="tid(testLocators.closeButton)"
        :view="uiButtonView.action"
        :size="uiButtonSize.xl"
        :is-expanded="true"
        @click="onClose"
      >
        {{ textAttributes.closeButton }}
      </ui-button>
    </div>
  </ui-dialog>
</template>
