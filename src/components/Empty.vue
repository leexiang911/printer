<!--
 *@Author: 作者名 l理想
 *@Date: 2024-07-21 22:12:06
 *@Description: 这是空组件表示没有数据的时候显示的
-->
<script setup lang="ts">
import { defineComponent, ref } from 'vue'
const props = defineProps({
  title: String
})
</script>

<template>
  <div class="empty">
    {{ props.title }}
  </div>
</template>

<style lang="scss" scoped>
/* vue3模板生成，这里的scss可以更换 */
/* npm add less less-loader -D */
/* npm add sass sass-loader - */
/* npm add stylus stylus-loader -D */
/* npm config get registry */
.empty {
  width: 100%;
  height: 100%;
  border: 2px red dashed;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
