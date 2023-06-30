<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <div
    :class="b()"
    :data-test="tid()"
  >
    <ui-icon-base
      :class="b('icon')"
      :name="iconName.sponsor"
    />

    <div :class="b('text', { underline: true })">
      {{ displayedLogin }}
    </div>

    <div :class="b('text')">
      {{ displayedFio }}
    </div>
  </div>
</template>
