<template>
  <div>
    <div class="container">
      <div v-show="props.labels.length > 0">
        <div class="title">
          <h1>请填写信息</h1>
        </div>
        <div class="context" v-for="(item, index) in props.labels" :key="index">
          <div class="text">{{ item }}:</div>
          <div class="input">
            <el-input
              type="text"
              size="mini"
              @blur="isHave(index)"
              v-model="data.values[index]"
              @keyup.enter="submit"
              @keyup.esc="reset(index)"
            ></el-input>
          </div>
          <div v-show="data.reminds[index]" class="remind">
            * {{ item }}不能为空
          </div>
        </div>
        <div class="buttons">
          <el-button type="primary" plain class="button" @click="submit"
            >提交</el-button
          >
          <el-button type="primary" plain class="button" @click="reset(-1)"
            >重置</el-button
          >
        </div>
      </div>
      <div v-show="props.labels.length <= 0">
        <div class="title">
          <h1>暂无信息</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus"
import { defineComponent, reactive } from "vue"
export default defineComponent({
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    values: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const data: { values: Array<string>; reminds: Array<boolean> } = reactive({
      values: [],
      reminds: []
    })

    const isHave = (index: number) => {
      if (data.values[index] !== "" && data.values[index]) {
        data.reminds[index] = false
      } else {
        data.reminds[index] = true
      }
    }
    const submit = () => {
      let flag = true
      let errorIndex = -1
      let result: { [key: string]: any } = {}
      for (let i = 0; i < data.values.length; i++) {
        if (!(data.values[i] !== "" && data.values[i])) {
          flag = false
          errorIndex = i
          break
        }
        result["" + props.labels[i]] = data.values[i]
      }
      if (flag) {
        ElMessage({
          type: "success",
          message: "提交成功"
        })
        console.log(result)
        return result
      }
      ElMessage({
        type: "error",
        message: "提交失败：请填写" + props.labels[errorIndex]
      })
      return null
    }
    const init = () => {
      for (let i = 0; i < props.labels.length; i++) {
        data.values[i] = props.values[i] as string
      }
    }
    const reset = (index: number) => {
      if (index === -1) {
        for (let i = 0; i < props.labels.length; i++) {
          data.values[i] = ""
          data.reminds[i] = false
        }
      } else {
        data.values[index] = ""
        data.reminds[index] = false
      }
    }
    reset(-1)
    init()
    return { props, data, isHave, reset, submit }
  }
})
</script>

<style scoped lang="scss">
.container {
  max-height: 100%;
}
.context {
  display: flex;
  max-width: 100%;
  word-wrap: break-word;
  align-items: center;
  margin: 0 30px;
}
.text {
  min-width: 150px;
}
.input {
  margin: 10px 20px;
}
.buttons {
  width: 100%;
  text-align: center;
  margin: 30px 0 10px 0;
}
.button {
  width: 100px;
  margin: 0 10px;
  font-size: 20px;
}
.title {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
