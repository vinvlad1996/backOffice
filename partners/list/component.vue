<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <div
    :class="b()"
    :data-test="tid()"
  >
    <ul
      :class="b('list')"
      :data-test="tid(testLocators.list)"
    >
      <li
        v-for="(item, index) of sortedCandidates"
        :key="item.login"
        :class="b('item')"
        :data-test="tid(testLocators.items)"
      >
        <div :class="b('top')">
          <nuxt-link
            :class="b('text', { underline: true })"
            :data-test="tid(testLocators.inviteLink)"
            :to="invitePartnerRoute"
          >
            ID {{ item.login }}
          </nuxt-link>

          <div
            :class="b('text')"
            :data-test="tid(testLocators.date)"
          >
            {{ textAttributes.activation }} {{ displayedActivationDate(item.activationDate) }}
          </div>
        </div>

        <ui-divider
          :orientation="uiDividerOrientation.default"
          :color="uiDividerColor.basicGrey"
          :is-expanded="true"
        />

        <div
          :class="b('title')"
          :data-test="tid(testLocators.name)"
        >
          {{ item.firstName }} {{ item.lastName }}
        </div>

        <div :data-test="tid(testLocators.title)">
          {{ textAttributes.goStatus }}

          <span
            :class="b('text', { bold: true })"
            :data-test="tid(testLocators.status)"
          >
            {{ item.goStatus }} {{ externalCurrency }}
          </span>
        </div>

        <div :data-test="tid(testLocators.title)">
          {{ textAttributes.volume }}

          <span
            :class="b('text', { bold: true })"
            :data-test="tid(testLocators.size)"
          >
            {{ item.pv }} {{ externalCurrency }}
          </span>
        </div>

        <ui-button
          :view="buttonView(index)"
          :size="uiButtonSize.xs"
          :is-expanded="true"
          :data-test="tid(testLocators.attachButton)"
          @click="attachPartner(item.login)"
        >
          {{ textAttributes.attach }}
        </ui-button>
      </li>
    </ul>
  </div>
</template>
