<script setup lang="ts">
import { ref, h, watch } from 'vue'
import Empty from '@/components/Empty.vue'
import Teble from '@/components/Table.vue'
import type { tableType } from '@/ctrl/data'

let startNumber = ref(0)
let printDate = ref('')
let expressInformation = ref(!false)
let receipt = ref(!false)
// 传入的表格数据处理好
const tableArrData = ref<tableType[]>([])
// 要打印的数据，组装过
const printArrdata = ref<tableType[]>([])
// 处理输入数据
const inputFun = () => {}

const pasetHandle = (event: { clipboardData: any }) => {
  tableArrData.value = [] // 清空数据
  const clipboardData = event.clipboardData
  let pastedData = clipboardData.getData('text') as string
  pastedData = pastedData.replace(/\r/g, '') // 去除所有的 \r
  const rows = pastedData.split('\n') //  得到所有的行
  console.log(rows, 'rows')
  if (rows.length === 0) {
    return
  }

  // 这里用foreach比较好
  rows.forEach((item, index, arr) => {
    const cells = item.split('\t').filter((i) => i !== '')
    if (cells.length < 4) {
      ElMessage.error('格式错误')

      return
    }

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
    if (startNumber.value) {
      obj.Nub = (Number(startNumber.value) + index).toString()
    }
    tableArrData.value[index] = obj
  })
  // @ts-ignore
  if (tableArrData.value.length) {
    ElMessage.success('粘贴成功')
  }
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
watch([startNumber], (newValues, oldValues): void => {
  tableArrData.value.forEach((item, index, arr) => {
    // item.Nub = Number(oldValues[0]++).toString()
    console.log(index, 'inex')
    item.Nub = (Number(newValues[0]) + index).toString()
  })
  console.log('数据变化了', `新值是：${newValues[0]}`, `旧值是${oldValues[0]}`)
  console.log(tableArrData.value, 666)
})
const emitsSelectData = (e: tableType[]) => {
  printArrdata.value = e
  console.log(printArrdata.value)
}

// 队列调用文件打印
async function printFilesInSequence(dataArr: tableType[]) {
  if (dataArr.length === 0) {
    alert('没有可以打印内容')
    return
  }
  for (const filename of dataArr) {
    if (!(await printFile(filename))) {
      return false
    }
  }
  return true
}

async function printFile(data: tableType) {
  try {
    // 打开文件
    // 读取文件内容
    // 将文件内容发送到打印机
    console.log(data, '打印单个', data.Nub)
  } catch (error) {
    // 处理打印错误
    console.error(error)
    return false
  } finally {
    // 关闭文件
  }
  return true
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
        <el-date-picker
          id="selectDate"
          v-model="printDate"
          type="datetime"
          placeholder="请选择时间"
        />
      </p>

      <p class="inputItem">
        <label for="wuliuToggle">去除快递信息</label>
        <el-switch id="wuliuToggle" disabled v-model="expressInformation" />
      </p>
      <p class="inputItem">
        <label for="wuliuToggle">去除发票信息</label>
        <el-switch id="wuliuToggle" disabled v-model="receipt" />
      </p>

      <p class="inputItem">
        <label for="selfId">输入个人代号</label>
        <el-input id="selfId" placeholder="请输入个人代号" />
      </p>
    </div>

    <div v-show="tableArrData.length === 0" class="copy_scope">
      <p class="title" @paste.stop="pasetHandle">点击蓝色区域 按下(ctrl+v)将要打印的表格粘贴到此</p>
    </div>

    <Teble
      v-show="tableArrData.length !== 0"
      :table-arr="tableArrData"
      @select-data="(e) => emitsSelectData(e)"
    />

    <!-- <el-button @click="openVn">777</el-button> -->
    <el-button @click="printFilesInSequence(printArrdata)">一键打印</el-button>
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
      font-size: 3.5rem;
    }
  }
}

.ctrlInput {
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: grid;
  grid-template-columns: 20% 20% 10% 10% 20% auto;
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
