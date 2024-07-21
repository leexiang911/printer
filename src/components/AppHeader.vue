<!--
 *@Author: 作者名 
 *@Date: 2024-07-20 22:53:55
 *@Description: 
-->

<script setup lang="ts">
import { iscollapse } from "@/ctrl";
import { defineComponent, ref } from "vue";

</script>

<template>
    <el-header>
        <el-icon @click="iscollapse = !iscollapse">
            <Expand v-show="iscollapse" />
            <Fold v-show="!iscollapse" />
        </el-icon>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">promotion management</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>

        <el-dropdown>
            <span class="el-dropdown-link">
                更多操作
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>

</template>

<style lang="scss" scoped>
/* vue3模板生成，这里的scss可以更换 */
/* npm add less less-loader -D */
/* npm add sass sass-loader - */
/* npm add stylus stylus-loader -D */
/* npm config get registry */
:focus-visible {
    outline: none;
}

.el-header {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;

    .el-dropdown {
        margin-left: auto;
    }

    .el-dropdown-link:focus {
        outline: none;
    }
}
</style>