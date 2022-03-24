<template>
  <div class="container">
    <el-table :data="data.user" stripe>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        sortable
      ></el-table-column>
      <el-table-column
        prop="telephone"
        label="用户电话"
        sortable
      ></el-table-column>
      <el-table-column
        prop="location"
        label="送餐地址"
        sortable
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { stateList } from "@/context/state"
import axios from "axios"
export default defineComponent({
  setup() {
    const data = reactive({
      user: [],
    })
    axios
      .request({
        url: "/user/getAllUser",
        method: "GET",
      })
      .then(res => {
        data.user = res.data.data
        console.log(res)
      })

    return { data, stateList }
  },
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
