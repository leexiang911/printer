<!--
 *@Author: 作者名 
 *@Date: 2024-07-20 20:23:28
 *@Description: 
-->

<script setup lang="ts">
import { iscollapse } from "@/ctrl";
import { Setting } from "@element-plus/icons-vue";
</script>

<template>
    <el-aside>
        <el-scrollbar>
            <el-menu router :unique-opened="true" :collapse="iscollapse">

                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <DataAnalysis />
                        </el-icon> <span>数据</span>
                    </template>
                    <el-menu-item>
                        <el-icon>
                            <List />
                        </el-icon><span>签收列表</span>
                    </el-menu-item>

                    <el-menu-item>
                        <el-icon>
                            <List />
                        </el-icon><span>登记列表</span>
                    </el-menu-item>


                    <el-menu-item>
                        <el-icon>
                            <Search />
                        </el-icon><span>待查询列表</span>
                    </el-menu-item>
                </el-sub-menu>



                <el-sub-menu index="2">

                    <template #title>
                        <el-icon>
                            <MagicStick />
                        </el-icon> <span>其他</span>
                    </template>
                    <el-menu-item index="/print">
                        <el-icon>
                            <Printer />
                        </el-icon>
                        <span>打印标签</span>
                    </el-menu-item>

                    <el-menu-item>
                        <el-icon>
                            <Setting />
                        </el-icon><span>设置</span>
                    </el-menu-item>

                </el-sub-menu>

                <el-menu-item>
                    <el-icon>
                        <Tickets />
                    </el-icon><span>待办事项</span>
                </el-menu-item>
                <el-menu-item>
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>笔记</span>
                </el-menu-item>

                <el-menu-item index="/home">
                    <el-icon>
                        <View />
                    </el-icon>
                    <span>权限管理</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </el-aside>


</template>

<style lang="scss" scoped>
/* vue3模板生成，这里的scss可以更换 */
/* npm add less less-loader -D */
/* npm add sass sass-loader - */
/* npm add stylus stylus-loader -D */
/* npm config get registry */

.el-aside {
    background-color: #eee;
    width: auto;
    height: 100%;
}

.el-menu {
    width: 200px;
    background: #eee;
    border-right: none;

    &.el-menu--collapse {
        width: 60px;

    }
}
</style>