<script setup lang="ts">
import { ref, h } from 'vue'
import Empty from '@/components/Empty.vue'
import Teble from '@/components/Table.vue'

let startNumber = 789

interface cellsDataType {
  storeName: string // 店铺名字
  nickName: string //买家昵称
  index: number // 序号
  trackingNumber: number //快递单号
  date: string // 日期
  action: '反厂' | '入库' | ''
}

const tableArrData = ref<cellsDataType[]>([])

const pasetHandle = (event: { clipboardData: any }) => {
  tableArrData.value = [] // 清空数据
  const clipboardData = event.clipboardData
  let pastedData = clipboardData.getData('text')
  pastedData = pastedData.replace(/\r/g, '') // 去除所有的 \r
  const rows = pastedData.split('\n') //  得到所有的行
  if (rows.length === 1) {
    return
  }
  ElMessage.success('粘贴成功')


  for (const text of rows) {
    let cells = text.split('\t')
    const filteredArr = cells.filter(item => item !== "");
    console.log(filteredArr)
    if (filteredArr.length == 0) {
      return;
    }
    let storeName: string = cells[1].replace('墨书', 'M').replace('炫亮', 'X');


    tableArrData.value.push({
      index: startNumber++,
      nickName: cells[0],
      storeName: storeName,
      action: ''
    })
  }
  console.log(tableArrData.value)
}

const openVn = () => {
  ElMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
  // let html = document.getElementsByTagName('html')[0]
  // html.classList.add('dark')
}
</script>

<template>
  <main>
    <Empty title="你好" />
    <Teble />
    <div class="copy_scope" @paste.self="pasetHandle">请点击我后粘贴表格数据到此 (ctrl+v)</div>

    <el-button @click="openVn">777</el-button>
  </main>
</template>

<style scoped>
.copy_scope {
  border: 2px solid red;
  border-radius: 1rem;
  padding: 1rem;
}
</style>
