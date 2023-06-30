<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss"></style>

<template>
  <div
    :class="b()"
    :data-test="tid()"
  >
    <div
      :class="b('search')"
      :data-test="tid(testLocators.searchBlock)"
    >
      <ui-input
        :value="partnersSearch"
        :view="uiInputView.regular"
        :placeholder="textAttributes.placeholder"
        :is-expanded="true"
        :data-test="tid(testLocators.searchInput)"
        @input="changePartnersSearch"
      >
        <template #append>
          <ui-icon-base :name="iconName.search" />
        </template>
      </ui-input>
    </div>

    <div
      :class="b('configuration')"
      :data-test="tid(testLocators.configuration)"
    >
      <div
        :class="b('title')"
        :data-test="tid(testLocators.configurationTitle)"
      >
        {{ textAttributes.expandBranch }}
      </div>

      <div :class="b('filters')">
        <ui-tabs
          :value="selectedLevel"
          :class="b('filters')"
          :view="uiTabView.filter"
          :items="switchFilters"
          :data-test="tid(testLocators.configurationLevels)"
          @input="selectLevel"
        />
      </div>

      <div :class="b('block')">
        <collapse-all-button
          :view="catalogFilterButtonView.alt"
          @collapse-all="collapseAllAccordions"
        />

        <expand-all-button
          :class="b('expand-all-button')"
          :view="catalogFilterButtonView.alt"
          @expand-all="expandAllAccordions"
        />
      </div>
    </div>

    <div
      :class="b('tree')"
      :data-test="tid(testLocators.tree)"
    >
      <el-tree
        ref="tree"
        :key="isBranchesAllExpanded"
        :data="partnersTree"
        :props="defaultProps"
        :default-expand-all="isBranchesAllExpanded"
        :filter-node-method="isFilterPartnersTree"
        :empty-text="textAttributes.emptyData"
      >
        <div
          slot-scope="{ data }"
          :class="b('wrapper')"
          :tree-partner-login="data.partner.login"
        >
          <div
            :class="b('content')"
            :data-test="tid(testLocators.treeContent)"
          >
            <span
              :class="b('text', { colored: true })"
              :data-test="tid(testLocators.treePartnerLogin)"
            >
              {{ data.partner.login }}
            </span>

            <span
              :class="b('text')"
              :data-test="tid(testLocators.treePartnerFio)"
            >
              {{ data.partner.firstName }} {{ data.partner.lastName }}
            </span>

            <span
              :class="b('text')"
              :data-test="tid(testLocators.treePartnerGpv)"
            >
              {{ data.partner.gpv }} {{ externalCurrency }}
            </span>
          </div>

          <span
            v-if="data.partnersInTree"
            :class="b('text', { grey: true })"
            :data-test="tid(testLocators.treeText)"
          >
            {{ displayedText(data.partnersInTree) }}
          </span>
        </div>
      </el-tree>
    </div>
  </div>
</template>
