<template>
  <div class="container">
    <div class="mask" v-if="data.show" @click="toHidden">
      <Modify
        @click.stop="() => {}"
        @submit="submit"
        :labels="['配送员密码', '联系电话']"
        :currentData="[data.currentData[2], data.currentData[3]]"
        :title="['配送员账号', data.currentData[1]]"
      ></Modify>
    </div>
    <div class="mask" v-if="data.regShow" @click="regHidden">
      <Modify
        @click.stop="() => {}"
        @submit="regSubmit"
        :labels="['配送员账号', '配送员密码', '联系电话']"
      ></Modify>
    </div>
    <div class="header">
      <div class="buttons">
        <el-button @click="getInfo" class="button">刷新</el-button>
        <el-button @click="regShow" class="button">创建配送员</el-button>
      </div>
    </div>
    <el-table
      :data="data.user"
      stripe
      :row-class-name="tableRowClassName"
      v-loading="data.loading"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        prop="username"
        label="配送员账号"
        sortable
      ></el-table-column>
      <el-table-column
        prop="telephone"
        label="联系电话"
        sortable
      ></el-table-column>
      <el-table-column label="操作" width="200px">
        <template #default="scope">
          <el-button size="small" @click="toShow(scope.row)">编辑</el-button>
          <el-button
            size="small"
            @click="toStart(scope.row)"
            v-if="scope.row.isStop"
            >启用</el-button
          >
          <el-button size="small" @click="toStop(scope.row)" v-else
            >停用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { ElNotification } from "element-plus"
import { defineComponent, reactive } from "vue"
import { stateList } from "@/context/state"
import axios from "axios"
import Modify from "@/components/Modify/Index.vue"
export default defineComponent({
  setup() {
    const data: {
      user: Array<any>
      show: boolean
      regShow: boolean
      currentData: Array<any>
      loading: boolean
    } = reactive({
      user: [],
      show: false,
      currentData: [],
      loading: false,
      regShow: false,
    })
    const getInfo = () => {
      data.loading = true
      axios
        .request({
          url: "/deliverer/getAllDeliverer",
          method: "GET",
        })
        .then(res => {
          data.user = res.data.data
          data.loading = false
        })
    }
    getInfo()

    const toHidden = () => {
      data.show = false
    }
    const toShow = (row: any) => {
      data.currentData = [row.id, row.username, row.password, row.telephone]
      data.show = true
    }
    const toStop = (row: any) => {
      axios
        .request({
          url: "/deliverer/stop",
          method: "POST",
          data: {
            id: row.id,
          },
        })
        .then(res => {
          if (res.data.state) {
            ElNotification({
              title: "停用成功",
              type: "success",
            })
            getInfo()
          } else {
            ElNotification({
              title: "停用失败",
              message: "请重试",
              type: "warning",
            })
          }
        })
    }
    const toStart = (row: any) => {
      axios
        .request({
          url: "/deliverer/start",
          method: "POST",
          data: {
            id: row.id,
          },
        })
        .then(res => {
          if (res.data.state) {
            ElNotification({
              title: "启用成功",
              type: "success",
            })
            getInfo()
          } else {
            ElNotification({
              title: "启用失败",
              message: "请重试",
              type: "warning",
            })
          }
        })
    }

    const tableRowClassName = ({ row }: { row: any }) => {
      console.log(row.isStop)
      if (row.isStop) {
        return "is-stop"
      }
      return ""
    }

    const submit = (datas: Array<any>) => {
      axios
        .request({
          url: "/deliverer/modify",
          method: "POST",
          data: {
            deliverer: {
              id: data.currentData[0],
              username: data.currentData[1],
              password: datas[0],
              telephone: datas[1],
            },
            oldPassword: data.currentData[2],
          },
        })
        .then(res => {
          if (res.data.state) {
            ElNotification({
              title: "修改成功",
              type: "success",
            })
            toHidden()
            getInfo()
          } else {
            ElNotification({
              title: "修改失败",
              message: res.data.message,
              type: "warning",
            })
          }
        })
    }

    const regHidden = () => {
      data.regShow = false
    }
    const regShow = () => {
      data.regShow = true
    }
    const regSubmit = (datas: Array<any>) => {
      axios
        .request({
          url: "/deliverer/register",
          method: "POST",
          data: {
            deliverer: {
              username: datas[0],
              password: datas[1],
              telephone: datas[2],
            }
          },
        })
        .then(res => {
          if (res.data.state) {
            ElNotification({
              title: "创建成功",
              type: "success",
            })
            regHidden()
            getInfo()
          } else {
            ElNotification({
              title: "创建失败",
              message: res.data.message,
              type: "warning",
            })
          }
        })
    }
    return {
      data,
      stateList,
      getInfo,
      toHidden,
      toShow,
      submit,
      toStop,
      toStart,
      tableRowClassName,
      regHidden,
      regShow,
      regSubmit,
    }
  },
  components: { Modify },
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
