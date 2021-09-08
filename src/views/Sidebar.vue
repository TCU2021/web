<template>
  <div class="container">
    <div class="title">
      <img src="@/assets/logo.png" class="logo" />
      <span style="font-size:18px;">快取餐管理系统</span>
    </div>
    <el-menu
      :uniqueOpened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#2E2E2E"
      text-color="white"
      active-text-color="#F2F5A9"
      router
      unique-opened
    >
      <template v-for="(item, i) in sidebars" :key="i">
        <el-sub-menu v-if="'children' in item">
          <el-menu-item
            class="item"
            v-for="(child, iChild) in item.children"
            :key="iChild"
            :index="child.path"
          >
            {{ child.title }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path" class="item">
          {{ item.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "Sidebar",
  props: {
    sidebars: {
      type: Array,
      default: () => []
    }
  }
})
</script>

<style lang="scss" scoped>
.logo {
  width: 50px;
  height: 50px;
}
.title {
  padding: 10px;
  display: flex;
  align-items: center;
  color: #eee;
}
.item {
  width: 200px;
  font-size: 20px;
}
</style>
