<template>
  <div class="container">
    <el-table :data="data.user" stripe>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="number" label="柜门号" sortable></el-table-column>
      <el-table-column prop="vacant" label="是否占用" sortable>
        <template #default="scope">
          {{ scope.row.vacant ? "未被占用" : "已占用" }}
        </template>
      </el-table-column>
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
        url: "/cabinet/getAllCabinet",
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
