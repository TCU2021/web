<template>
  <div class="container">
    <div class="mask" v-if="data.show" @click="toHidden">
      <AddOrder @click.stop="() => {}" @submit="submit"></AddOrder>
    </div>
    <div class="header">
      <div class="buttons">
        <el-button @click="getInfo" class="button">刷新</el-button>
        <el-button @click="toShow" class="button">新增订单</el-button>
      </div>
    </div>
    <el-table
      :data="data.order"
      :row-class-name="tableRowClassName"
      v-if="data.refresh"
      v-loading="data.loading"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="订单名称" sortable></el-table-column>
      <el-table-column prop="state" label="订单状态" sortable>
        <template #default="scope">
          {{ stateList[scope.row.state] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="所占柜号"
        sortable
      ></el-table-column>
      <el-table-column
        prop="location"
        label="送餐地点"
        sortable
      ></el-table-column>
      <el-table-column
        prop="user_telephone"
        label="用户电话"
        sortable
      ></el-table-column>
      <el-table-column prop="deliverer_telephone" label="送餐员电话" sortable>
        <template #default="scope">
          {{
            scope.row.deliverer_telephone
              ? scope.row.deliverer_telephone
              : "暂无"
          }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { stateList } from "@/context/state"
import axios from "axios"
import AddOrder from "./AddOrder/Index.vue"
import { ElNotification } from "element-plus"
export default defineComponent({
  setup() {
    const data = reactive({
      // activiting: 0,
      // finish: 0,
      order: [],
      show: false,
      refresh: true,
      loading: false,
    })
    const getInfo = () => {
      data.loading = true
      axios
        .request({
          url: "/order/getAllOrders",
          method: "GET",
        })
        .then(res => {
          data.order = res.data
          // for (let i = 0; i < data.order.length; i++) {
          //   if (res.data[i]?.state === 3) {
          //     data.finish++
          //   } else {
          //     data.activiting++
          //   }
          // }
          console.log(res)
        })
      setTimeout(() => {
        data.loading = false
      }, 500)
    }
    getInfo()
    const tableRowClassName = ({ row }: { row: any }) => {
      switch (row.state) {
        case 0:
          return "orderList-one"
        case 1:
          return "orderList-two"
        case 2:
          return "orderList-three"
        case 3:
          return "orderList-four"
      }
      return ""
    }
    const toShow = () => {
      data.show = true
    }

    const toHidden = () => {
      data.show = false
    }

    const submit = (data: any) => {
      console.log(data[0])
      axios
        .request({
          url: "/order/addOrder",
          method: "POST",
          data: {
            userTelephone: data[0],
            location: data[1],
            name: data[2],
          },
        })
        .then(res => {
          console.log(res)
          if (res.data.state) {
            toHidden()
            getInfo()
            // data.refresh = false
            // nextTick(() => {
            //   data.refresh = true
            // })
            ElNotification({
              title: "添加成功",
              type: "success",
            })
          } else {
            ElNotification({
              title: "添加失败",
              message: res.data.message,
              type: "warning",
            })
          }
        })
    }

    return {
      data,
      stateList,
      tableRowClassName,
      toShow,
      toHidden,
      submit,
      getInfo,
    }
  },
  components: { AddOrder },
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  .header {
    display: flex;
    .buttons {
      margin-left: auto;
    }
  }
}
</style>
