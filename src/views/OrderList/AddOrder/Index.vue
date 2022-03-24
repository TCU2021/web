<template>
  <div class="AddOrderContainer">
    <div class="item" v-for="(item, index) in data.labels" :key="index">
      <div class="text">{{ item }}：</div>
      <div class="input"><input v-model="data.datas[index]" /></div>
    </div>
    <div class="buttons">
      <el-button class="button" @click="submit">提交</el-button>
      <el-button class="button" @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue"
export default defineComponent({
  setup(props, context) {
    const data: { datas: Array<string> } = reactive({
      datas: [],
      labels: ["用户电话", "送餐位置"],
    })
    const submit = () => {
      context.emit("submit", data.datas)
    }
    const reset = () => {
      for (let i = 0; i < data.datas.length; i++) {
        data.datas[i] = ""
      }
    }
    return { data, submit, reset }
  },
})
</script>

<style scoped lang="scss">
.AddOrderContainer {
  height: 15%;
  min-height: 200px;
  width: 40%;
  min-width: 340px;
  background-color: rgba($color: #ffffff, $alpha: 0.5);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .item {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
}
</style>
