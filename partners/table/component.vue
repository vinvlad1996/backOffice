<script lang="ts" src="./component.ts"></script>
<style lang="scss" src="./component.scss"></style>

<template>
  <div
    :class="b()"
    :data-test="tid()"
  >
    <ui-button
      v-if="isVolumeView"
      :is-nuxt-link="true"
      :view="uiButtonView.simple"
      :size="uiButtonSize.byContent"
      :to="marketingRoute"
    >
      <span :class="b('button-label')">
        {{ textAttributes.treeInMarketingPlan }}
      </span>
    </ui-button>

    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      :span-method="tableRowAndColumnSpan"
      :data-test="tid(testLocators.elTable)"
    >
      <el-table-column
        v-for="index in quantityOfBranchesWithInitalColumn"
        :key="index"
        :label="displayedLabel(index)"
        :prop="currentKey(index)"
        :width="currentColumnWidth(index)"
        :fixed="isColumnFixed(index)"
        :data-test="tid(testLocators.elTableColumn)"
      >
        <template slot-scope="scope">
          <ui-button
            v-if="isButtonView(scope.row[currentKey(index)].view)"
            :view="scope.row[currentKey(index)].buttonView"
            :size="uiButtonSize.xs"
            :is-expanded="true"
            :data-test="tid(testLocators.button)"
            @click="selectBranch(index)"
          >
            <p :class="b('label')">
              {{ textAttributes.select }}
            </p>
          </ui-button>

          <div
            v-else
            :class="b('text', {
              view: scope.row[currentKey(index)].view,
              position: scope.row[currentKey(index)].position
            })"
            :data-test="tid(testLocators.text)"
            v-html="scope.row[currentKey(index)].text"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
