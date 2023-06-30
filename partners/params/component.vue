<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <div
    :class="b()"
    :data-test="tid()"
  >
    <div
      :class="b('block')"
      :data-test="tid(testLocators.content)"
    >
      <div
        :class="b('login', { view })"
        :data-test="tid(testLocators.login)"
      >
        {{ displayedLogin }}
      </div>

      <div
        v-if="isRowDisplay"
        :class="b('text', { bold: true })"
        :data-test="tid(testLocators.fio)"
      >
        {{ displayedFio }}
      </div>

      <div
        :class="b('text')"
        :data-test="tid(testLocators.goStatus)"
      >
        {{ displayedGoStatus }}
      </div>

      <div
        v-if="!isRowDisplay"
        :class="b('text')"
        :data-test="tid(testLocators.rank)"
      >
        {{ displayedRankTitle }}
      </div>
    </div>

    <div
      v-if="isSponsorFioShown"
      :class="b('text', { bold: true })"
      :data-test="tid(testLocators.sponsorFio)"
    >
      {{ displayedFio }}
    </div>
  </div>
</template>
