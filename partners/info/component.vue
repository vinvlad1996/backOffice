<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <div
    :class="b()"
    :data-test="tid()"
  >
    <ui-icon-base
      :name="iconName.sponsor"
      :class="b('icon')"
    />

    <div
      :class="b('text', { underline: true })"
      :data-test="tid(testLocators.login)"
    >
      {{ login }}
    </div>

    <div
      :class="b('text')"
      :data-test="tid(testLocators.fio)"
    >
      {{ firstName }} {{ lastName }}
    </div>
  </div>
</template>
