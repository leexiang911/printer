<!--
 *@Author: 作者名 
 *@Date: 2024-07-20 20:08:14
 *@Description: 
-->

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import AppAside from './AppAside.vue'
import AppHeader from './AppHeader.vue'
</script>

<template>
    <div class="common-layout">
        <el-container>
            <AppAside />
            <el-container class="header-and-main">
                <AppHeader />

                <el-main>
                    <el-scrollbar>
                        <RouterView />
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="less" scoped>
/* vue3模板生成，这里的scss可以更换 */
/* npm add less less-loader -D */
/* npm add sass sass-loader - */
/* npm add stylus stylus-loader -D */
/* npm config get registry */
.header-and-main {
    flex-direction: column;
}

.common-layout,
.el-container {
    width: 100%;
    height: 100%;
}
</style>
