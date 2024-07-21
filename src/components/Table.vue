<!--
 *@Author: 作者名 理想
 *@Date: 2024-07-21 22:21:15
 *@Description: 表格组件
-->
<script setup lang="ts">
import { defineComponent, ref } from 'vue'
interface User {
  date: string
  name: string
  address: string
}
const tableData: User[] = [
  {
    date: '2016-05-04',
    name: 'Aleyna Kutzner',
    address: 'Lohrbergstr. 86c, Süd Lilli, Saarland'
  },
  {
    date: '2016-05-03',
    name: 'Helen Jacobi',
    address: '760 A Street, South Frankfield, Illinois'
  },
  {
    date: '2016-05-02',
    name: 'Brandon Deckert',
    address: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen'
  },
  {
    date: '2016-05-01',
    name: 'Margie Smith',
    address: '23618 Windsor Drive, West Ricardoview, Idaho'
  }
]

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
</script>

<template>
  <el-table :data="tableData" style="width: 100%" stripe border>
    <el-table-column type="selection" width="55" />
    <el-table-column property="" label="No." width="80" />
    <el-table-column label="Date" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column property="name" label="Name" width="200" />
    <el-table-column property="name" label="item" width="200" />
    <el-table-column property="name" label="shop name" width="200" />
    <el-table-column property="name" label="order id" width="200" />

    <el-table-column property="name" label="tracking number" width="200" />

    <el-table-column
      property="address"
      label="use show-overflow-tooltip"
      width="240"
      show-overflow-tooltip
    />

    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
        <el-button size="small" type="primary">打印</el-button>
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
