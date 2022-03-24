<!--
数组:
  1.selectContent 多选框内容
  const selectContent = [
    {
      label: '零件名',
      prop: 'partName',
      labels: ['1', '2', '3', '4']
    }
  ]
-->
<template>
  <div>
    <div class="container">
      <div class="hello">
        <div
          class="select"
          v-for="(s, sIndex) in props.selectContent"
          :key="sIndex"
        >
          <div class="selectTitle">{{ s.label }}:</div>
          <div class="selectContent">
            <el-select
              placeholder="请选择"
              v-model="data.selectValue[sIndex]"
              multiple
              collapse-tags
            >
              <el-option
                v-for="(label, lIndex) in s.labels"
                :key="lIndex"
                :label="label"
                :value="label"
              >
                <span class="selectOption">{{ lIndex + 1 }}.</span>
                <span>{{ label }}</span>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="buttons">
          <el-button
            class="button"
            @click="resetSelectValue"
            type="primary"
            plain
          >
            重置
          </el-button>
          <el-button class="button" @click="setData" type="primary" plain>
            搜索
          </el-button>
          <div class="outsideButtons" v-if="props.buttonNames.length > 0">
            <el-button
              class="button"
              plain
              type="primary"
              v-for="(b, bIndex) in props.buttonNames"
              :key="bIndex"
              @click="buttonFunctions(bIndex)"
            >
              {{ props.buttonNames[bIndex] }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="data">
        <el-table
          v-loading="data.loading"
          element-loading-spinner="el-icon-loading"
          border
          :data="data.showData"
          fit
          highlight-current-row
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          v-if="data.tableUpdate"
        >
          <el-table-column type="index" v-if="tableData.length > 0" />
          <el-table-column
            v-for="(column, i) in columns"
            :key="i"
            :prop="column.prop"
            :label="column.label"
            sortable
          />
        </el-table>
      </div>
      <div
        class="suspensionWindow"
        v-show="insertData.isShow || updataData.isShow"
        @click="
          () => {
            insertData.isShow = false
            updataData.isShow = false
          }
        "
      ></div>
      <div class="insertBody" v-show="insertData.isShow">
        <div
          class="iconfont icon"
          @click="
            () => {
              insertData.isShow = false
            }
          "
        >
          &#xe60c;
        </div>
        <Info :labels="insertData.labels"></Info>
        <div class="cancelButtonPosition"></div>
      </div>
      <div class="updataBody" v-show="updataData.isShow">
        <div
          class="iconfont icon"
          @click="
            () => {
              updataData.isShow = false
            }
          "
        >
          &#xe60c;
        </div>
        <UpdataInfo
          :labels="updataData.labels"
          :values="updataData.values"
        ></UpdataInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, nextTick } from "vue"
import Info from "@/components/ElementPlusInfo.vue"
import UpdataInfo from "@/components/Updata/Index.vue"
export default defineComponent({
  props: {
    selectContent: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    buttonNames: {
      type: Array,
      default: () => [],
    },
    insertFunction: {
      type: Function,
      default: () => {
        return 0
      },
    },
    updataFunction: {
      type: Function,
      default: () => {
        return 0
      },
    },
  },
  setup(props) {
    const data: {
      selectValue: Array<any>
      showData: Array<any>
      tableUpdate: boolean
      loading: boolean
    } = reactive({
      selectValue: [],
      showData: [],
      tableUpdate: true,
      loading: false,
    })
    const insertData: {
      labels: Array<string>
      isShow: boolean
    } = reactive({
      labels: [
        "订单编号",
        "用户编号",
        "用户姓名",
        "用户联系电话",
        "骑手姓名",
        "骑手联系电话",
      ],
      isShow: false,
    })
    const updataData: {
      labels: Array<string>
      values: Array<string>
      isShow: boolean
    } = reactive({
      labels: [
        "订单编号",
        "用户编号",
        "用户姓名",
        "用户联系电话",
        "骑手姓名",
        "骑手联系电话",
      ],
      values: [
        "123456",
        "34567",
        "某人",
        "15987548555",
        "某骑手",
        "46513278946",
      ],
      isShow: false,
    })
    const setData = () => {
      data.loading = true
      const isShow = (
        i: number, // 判断是否符合第i个多选框条件
        currentData: any,
        selectContent: Array<any>
      ): boolean => {
        // 当前是否有值
        if (data.selectValue[i].length > 0) {
          // 是否存在这个属性
          if (currentData[selectContent[i].prop]) {
            for (let j = 0; j < data.selectValue[i].length; j++) {
              // 这个属性的值是否对得上
              if (
                currentData[selectContent[i].prop] === data.selectValue[i][j]
              ) {
                if (++i < data.selectValue.length) {
                  return isShow(i, currentData, selectContent)
                } else {
                  return true
                }
              }
            }
          }
        } else {
          if (++i < data.selectValue.length) {
            return isShow(i, currentData, selectContent)
          } else {
            return true
          }
        }
        return false
      }
      setTimeout(() => {
        let needSearch = false
        for (let i = 0; i < data.selectValue.length; i++) {
          if (data.selectValue[i].length > 0) {
            needSearch = true
            break
          }
        }
        data.showData = []
        if (needSearch) {
          for (let i = 0; i < props.tableData.length; i++) {
            if (isShow(0, props.tableData[i], props.selectContent)) {
              data.showData.push(props.tableData[i])
            }
          }
        } else {
          for (let i = 0; i < props.tableData.length; i++) {
            data.showData.push(props.tableData[i])
          }
        }
        data.tableUpdate = false
        nextTick(() => {
          data.tableUpdate = true
        })
        data.loading = false
      }, 300)
    }
    const resetSelectValue = () => {
      for (let i = 0; i < props.selectContent.length; i++) {
        data.selectValue[i] = []
      }
      setData()
    }
    const buttonFunctions = (index: number) => {
      if (index === 0) {
        updataData.isShow = true
        props.updataFunction()
      } else {
        insertData.isShow = true
        props.insertFunction()
      }
    }
    resetSelectValue()
    setData()
    return {
      props,
      data,
      insertData,
      updataData,
      setData,
      resetSelectValue,
      buttonFunctions,
    }
  },
  components: {
    Info,
    UpdataInfo,
  },
})
</script>

<style lang="scss" scoped>
* {
  font-size: 20px;
  margin: 0;
  padding: 0;
}
.container {
  height: 100%;
}
.hello {
  margin: 10px 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.select {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.selectContent {
  margin: 0 10px;
  width: 140px;
}
.selectOption {
  margin: 0 10px;
}
.buttons {
  display: flex;
  margin: 0 18px 10px auto;
}
.button {
  font-size: 20px;
  width: 100px;
}
.outsideButtons {
  margin-left: 10px;
}
.suspensionWindow {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: black;
  opacity: 70%;
}
.updataBody,
.insertBody {
  padding: 50px;
  z-index: 2;
  position: absolute;
  width: 500px;
  height: 0px;
  top: 0;
  bottom: 500px;
  left: 0;
  right: 0;
  margin: auto;
}
.icon {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 40px;
  cursor: pointer;
}
.cancel {
  width: 220px;
}
</style>
