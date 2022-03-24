<template>
  <div>
    <div class="container">
      <div class="search" v-show="!data.isSearch">
        <div class="text">请输入订单编号：</div>
        <div class="input">
          <el-input v-model="data.inputValue" @keyup.enter="search"></el-input>
        </div>
        <el-button
          class="button"
          type="primary"
          @keyup.enter="search"
          @click="search"
          v-loading="data.loading"
        >
          查询.
        </el-button>
      </div>
      <div v-show="data.isSearch">
        <Info :values="props.values" :labels="props.labels"></Info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Info from "@/components/ElementPlusInfo.vue"
import { ElMessage } from "element-plus"
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
        ElMessage({
          type: "success",
          message: "查询成功"
        })
      }, 500)
    }
    return { props, data, search }
  }
})
</script>

<style scoped lang="scss">
.container {
  margin: -50px;
  padding: 80px 40px 80px 40px;
  background-color: white;
  border-radius: 20px;
}
.inputParts {
  display: flex;
  align-items: center;
}
.text{
  width: 270px;
}
.button {
  margin-top: 20px;
  float: right;
}
</style>
