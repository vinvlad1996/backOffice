<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss" scoped></style>

<template>
  <div
    :class="b()"
    :data-test="tid()"
  >
    <div :class="b('wrapper')">
      <div :class="b('header')">
        <div :class="b('name')">
          {{ partnerData.firstName }} {{ partnerData.lastName }}
        </div>

        <ui-button
          :class="b('filter-button')"
          :view="uiButtonView.simple"
          :size="uiButtonSize.byContent"
          @click="openCommunications"
        >
          <ui-icon-base :name="iconName.filtersDefault" />
        </ui-button>
      </div>

      <ul
        ref="list"
        :class="b('list')"
      >
        <ui-button
          v-for="(item, index) in treeParams"
          :key="index"
          :class="b('item')"
          :view="uiButtonView.simple"
          :size="uiButtonSize.byContent"
          :is-disabled="isButtonDisabled(item.number)"
          @click="selectBranchNumber(item.number)"
        >
          <span>
            <div :class="b('label')">
              {{ textAttributes.branch }} {{ item.number }}
            </div>

            <div :class="b('card', { view: item.view })">
              <template v-if="isDefaultView(item.view)">
                <div :class="b('text', { colored: true })">
                  {{ item.login }}
                </div>

                <div :class="b('text', { ellipsis: true })">
                  {{ item.firstName }} {{ item.lastName }}
                </div>

                <div :class="b('text', { small: true })">
                  {{ item.goStatus }} {{ externalCurrency }}
                </div>
              </template>

              <template v-else-if="isSelectedView(item.view)">
                <ui-icon-base
                  :name="iconName.addPartner"
                  :class="b('icon')"
                />

                <div :class="b('text', { ['bold-colored']: true })">
                  {{ textAttributes.placeHere }}
                </div>
              </template>

              <template v-else-if="isAvailableView(item.view)">
                <ui-icon-base
                  :name="iconName.addPartnerDefault"
                  :class="b('icon')"
                />
              </template>

              <template v-else>
                <div :class="b('text', { grey: true })">
                  {{ textAttributes.notOpen }}
                </div>
              </template>
            </div>
          </span>
        </ui-button>
      </ul>
    </div>
  </div>
</template>
