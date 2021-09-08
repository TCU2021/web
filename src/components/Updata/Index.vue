<template>
  <div>
    <div class="container">
      <div class="search" v-show="!data.isSearch">
        <div class="text">请输入订单编号：</div>
        <div class="input">
          <el-input v-model="data.inputValue"></el-input>
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
      <div v-show="data.isSearch">
        <Info :values="props.values" :labels="props.labels"></Info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Info from "@/components/ElementPlusInfo.vue"
import { defineComponent, reactive } from "vue"
export default defineComponent({
  props: {
    values: {
      type: Array,
      default: () => []
    },
    labels: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Info
  },
  setup(props) {
    const data = reactive({
      isSearch: false,
      loading: false,
      inputValue: ""
    })
    const search = () => {
      data.loading = false
      setTimeout(() => {
        data.isSearch = true
        data.loading = false
      }, 500)
    }
    return { props, data, search }
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
