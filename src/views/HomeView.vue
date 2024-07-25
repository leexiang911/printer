<script setup lang="ts">
import { ref, h, watch, reactive } from 'vue'
import Teble from '@/components/Table.vue'
import type { tableType } from '@/ctrl/data'
// 导入打印模块
import { DTPWeb } from 'dtpweb'

const dialogTableVisible = ref(false)

const test = async (data: tableType) => {
  const date = new Date()
  const api = DTPWeb.getInstance()

  // 标签宽度
  const labelWidth = 60
  // 标签高度
  const labelHeight = 40
  const printerName = 'P1 Label Printer'
  const fontHeight = 6

  const text = `${data.Nub})
${data.nickName}
${data.item}
${data.trackingNumber.slice(-4) + data.shopName}
${data.action}         ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${date.getHours()}:${date.getMinutes()} `
  //  字体的高度，一般设置以后就有大小了
  console.log(text)
  // @ts-ignore
  const isUse = await api.openPrinter(printerName, (success) => {
    if (success) {
      // 2. 创建一个指定大小的标签任务
      api.startJob({ width: labelWidth, height: labelHeight, orientation: 90 })
      // 3. 在标签纸上打印目标字符串
      // @ts-ignore     widht属于标签宽度，height是绘制区域的高度，用来限制不要出现在标签边缘，容易模糊不清
      api.drawText({
        text,
        fontHeight,
        autoReturn: 0,
        x: 1,
        y: 1,
        width: 56,
        height: 56
      })
      // 4. 结束绘制操作，开始打印
      api.commitJob(() => {
        // 5. 关闭已经打开的打印机
        api.closePrinter()
      })
    }
  })
  console.log(isUse, '完成了')
}
let editIndex = ref(0)
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

// 编辑表格数据
const formEdit = reactive({
  item: '', // 商品名字
  action: '', // 操作
  Nub: '' // 序号
})

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
    const cells = item.split('\t')
    // .filter((i) => i !== '')

    if (item === '') {
      console.log('没有')
      return
    }
    arr.filter((i) => i !== '')
    const obj: tableType = {
      action: cells[11],
      Nub: index.toString(),
      date: cells[0],
      shopName: cells[1],
      nickName: cells[2],
      orderId: cells[3],
      item: cells[4],
      remark: cells[6],
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
  ElMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}
// 监听数据变化
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

  ;(async () => {
    for (const filename of dataArr) {
      if (!(await printFile(filename))) {
        return false
      }
    }
  })()
  return true
}

async function printFile(data: tableType) {
  try {
    // 打开文件
    // 读取文件内容
    // 将文件内容发送到打印机
    data.item = extractCourierInfo(data.item).product // 过滤掉快递等相关信息
    await test(data)
  } catch (error) {
    // 处理打印错误
    console.error(error)
    return false
  } finally {
    // 关闭文件
  }
  return true
}
function extractCourierInfo(text: string): { product: string; courier: string } {
  const couriers: string[] = ['顺丰', '顺丰专配', '中通', '极兔']
  const others: string[] = ['已开电子发票', '已开电子', '以开专票']
  for (const item of others) {
    const regex = new RegExp(item, 'g')
    text = text.replace(regex, '').trim()
  }

  // 使用正则表达式匹配快递公司名称及其后面的一个字母
  const regex = new RegExp(`(${couriers.join('|')})[A-Za-z]`, 'g')
  const match = text.match(regex)

  let courierName = ''
  if (match) {
    courierName = match[0].slice(0, -1) // 去掉最后一个字母
    text = text.replace(match[0], '').trim()
  }

  // 去掉快递公司名称前的中文逗号
  text = text.replace(/，$/, '').trim()

  // 找到最短的匹配快递公司名称
  let shortestCourier = courierName
  for (const courier of couriers) {
    if (courierName.includes(courier) && courier.length < shortestCourier.length) {
      shortestCourier = courier
    }
  }

  return { product: text, courier: shortestCourier }
}

// 示例用法
const inputText = '166A硒鼓3K页1个中通l已开电子'
const result = extractCourierInfo(inputText)
console.log(result.product) // 输出： "T-2309C高配版粉盒1个"
console.log(result.courier) // 输出： "顺丰"

/**
 * 编辑行数据
 * @param index 编辑到的第几行
 * @param row 编辑的行数据
 */
const emitsEditRow = (index: number, row: tableType) => {
  editIndex.value = index
  dialogTableVisible.value = true
  formEdit.item = row.item
  formEdit.action = row.action
  formEdit.Nub = row.Nub
}

// 保存编辑的数据
const saveEdit = () => {
  tableArrData.value.forEach((item, index, arr) => {
    if (index === editIndex.value) {
      item.item = formEdit.item
      item.action = formEdit.action
      item.Nub = formEdit.Nub
    }
  })
  dialogTableVisible.value = false
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
      @edit-row="(index, row) => emitsEditRow(index, row)"
    />

    <!-- <el-button @click="openVn">777</el-button> -->
    <el-button @click="printFilesInSequence(printArrdata)">一键打印</el-button>

    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-model="dialogTableVisible"
      title="修改行信息"
      :append-to-body="true"
      top="10vh"
    >
      <el-form :model="formEdit" label-width="auto" style="max-width: 700px">
        <el-form-item class="custom-width" label="请编辑序号:">
          <el-input v-model="formEdit.Nub" />
        </el-form-item>

        <el-form-item label="请编辑操作:" prop="region" placeholder="请选择或者输入">
          <el-select v-model="formEdit.action" allow-create filterable>
            <el-option label="入库" value="入库" />
            <el-option label="返厂" value="返厂" />
          </el-select>
        </el-form-item>

        <el-form-item class="custom-width full-width" label="请编辑品名:">
          <el-input v-model="formEdit.item" />
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
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

.el-form {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 20px;

  .full-width {
    grid-column: span 2;
  }
  .el-form-item {
    .el-input {
      width: 100%;
    }
  }
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
