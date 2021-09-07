<template>
  <div class="container">
    <div class="search" v-show="data.isSearch">
      <div class="text">请输入订单编号：</div>
      <div class="input">
        <el-input></el-input>
      </div>
      <el-button
        class="button"
        type="primary"
        @click="search"
        v-loading="data.loading"
      >
        查询</el-button
      >
    </div>
    <div v-show="!data.isSearch">
      <Info></Info>
    </div>
  </div>
</template>

<script lang="ts">
import Info from "@/components/ElementInfo.vue"
import { defineComponent, reactive } from "vue"
export default defineComponent({
  components: {
    Info
  },
  setup() {
    const data = reactive({
      isSearch: true,
      loading: false
    })
    const search = () => {
      data.loading = true
      setTimeout(() => {
        data.isSearch = false
        data.loading = false
      }, 500)
    }
    return { data, search }
  }
})
</script>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;
}
.input {
  width: 300px;
  margin: 0 20px;
}
</style>
