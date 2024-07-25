<!--
 *@Author: 作者名 理想
 *@Date: 2024-07-21 22:21:15
 *@Description: 表格组件
-->
<script setup lang="ts">
import type { tableType } from '@/ctrl/data'
import { defineEmits } from 'vue'

const props = defineProps({
  tableArr: {
    type: Array<tableType>,
    required: true
  }
})

const emits = defineEmits(['selectData', 'selectAllData', 'editRow', 'deleteRow'])
const selectAdataHanle = (e: tableType[]) => {
  emits('selectData', e)
}
const selectAllDataHandle = (e: tableType[]) => {
  emits('selectData', e)
}
const handleEdit = (index: number, row: tableType) => {
  emits('editRow', index, row)
}
const handleDelete = (index: number, row: tableType) => {
  emits('deleteRow', index)
}
</script>

<template>
  <el-table
    :data="props.tableArr"
    style="width: 100%"
    stripe
    border
    @select="selectAdataHanle"
    @selectAll="selectAllDataHandle"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="Nub" label="No." width="80" />
    <el-table-column label="Date" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column property="shopName" label="Shop name" width="130" />
    <el-table-column property="nickName" label="Nick name" width="200" />
    <el-table-column property="orderId" label="Order id" show-overflow-tooltip width="200" />
    <el-table-column property="item" label="Item" width="250" show-overflow-tooltip />

    <el-table-column property="trackingNumber" label="Tracking number" width="200" />

    <el-table-column property="action" label="Action" width="100" />
    <el-table-column property="remark" label="Remark" width="180" show-overflow-tooltip />

    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> Edit </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          Detle
        </el-button>
        <el-button size="small" type="primary">Print</el-button>
        <el-button size="small" type="primary" plain>Copy</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
/* vue3模板生成，这里的scss可以更换 */
/* npm add less less-loader -D */
/* npm add sass sass-loader - */
/* npm add stylus stylus-loader -D */
/* npm config get registry */
</style>
