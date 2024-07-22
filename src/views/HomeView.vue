<script setup lang="ts">
import { ref, h } from 'vue'
import Empty from '@/components/Empty.vue'
import Teble from '@/components/Table.vue'
import type { tableType } from '@/ctrl/data'

let startNumber = ref('')
let value1 = ref('')
let toggle = ref(true)
const tableArrData = ref<tableType[]>([])

const pasetHandle = (event: { clipboardData: any }) => {
  tableArrData.value = [] // 清空数据
  const clipboardData = event.clipboardData
  let pastedData = clipboardData.getData('text') as string
  pastedData = pastedData.replace(/\r/g, '') // 去除所有的 \r
  const rows = pastedData.split('\n') //  得到所有的行
  if (rows.length === 0) {
    return
  }

  // 这里用foreach比较好
  rows.forEach((item, index, arr) => {
    const cells = item.split('\t').filter((i) => i !== '')
    console.log(cells)
    const obj: tableType = {
      action: cells[11],
      Nub: '0',
      date: cells[0],
      shopName: cells[1],
      nickName: cells[2],
      orderId: cells[3],
      item: cells[4],
      remark: '',
      trackingNumber: cells[9]
    }
    tableArrData.value[index] = obj
  })
  // @ts-ignore
  ElMessage.success('粘贴成功')
}

const openVn = () => {
  // @ts-ignore
  ElMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}
</script>

<template>
  <main>
    <div class="ctrlInput">
      <p class="inputItem">
        <label for="startNum">输入起始序号</label>
        <el-input
          type="number"
          v-model="startNumber"
          min="0"
          id="startNum"
          placeholder="请输入起始序号"
        />
      </p>

      <p class="inputItem">
        <label for="selectDate">输入打印日期</label>
        <el-date-picker id="selectDate" v-model="value1" type="datetime" placeholder="请选择时间" />
      </p>

      <p class="inputItem">
        <label for="wuliuToggle">去除快递信息</label>
        <el-switch id="wuliuToggle" v-model="toggle" />
      </p>
    </div>

    <div v-show="tableArrData.length === 0" class="copy_scope" @paste.stop="pasetHandle">
      <p class="title">点击蓝色区域 按下(ctrl+v)将要打印的表格粘贴到此</p>
    </div>

    <Teble v-show="tableArrData.length !== 0" :table-arr="tableArrData" />

    <!-- <el-button @click="openVn">777</el-button> -->
  </main>
</template>

<style scoped>
.copy_scope {
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  color: #79bbff;
  cursor: pointer;
  height: 20%;
  border: 3px #79bbff dashed;
  background-color: #d9ecff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
  font-size: 3rem;
  flex-direction: column;

  .title {
    color: #c8c9cc;
    transition: all 0.5s;
  }
  &:hover {
    .title {
      color: #79bbff;
    }
  }
}

.ctrlInput {
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: grid;
  grid-template-columns: 20% 20% 20%;
}
.inputItem {
  display: flex;
  align-items: center;
  label {
    padding-right: 0.5rem;
    color: #606266;
  }
}
.el-input {
  width: auto;
}
</style>
