<template>
  <Form
    title="送货信息"
    :tableData="tableData"
    :columns="columns"
    :selectContent="selectContent"
    :buttonNames="buttonNames"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Form from "@/components/ElementPlusForm.vue"
export default defineComponent({
  components: {
    Form
  },
  setup() {
    const tableData = [
      {
        wid: "7465",
        wName: "yhrtg",
        wTelephone: "13333333333",
        oid: "89465132",
        oName: "gyihbjk",
        oTelephone: "13333333333",
        seller: "叫了只炸鸡",
        position: "天津市城建大学",
        price: "152",
        isFinish: "未完成"
      },
      {
        wid: "7465",
        wName: "yhrtg",
        wTelephone: "13333333333",
        oid: "89465132",
        oName: "gyihbjk",
        oTelephone: "13333333333",
        seller: "叫了只炸鸡",
        position: "天津市城建大学",
        price: "152",
        isFinish: "未完成"
      },
      {
        wid: "7465",
        wName: "yhrtg",
        wTelephone: "13333333333",
        oid: "89465132",
        oName: "gyihbjk",
        oTelephone: "13333333333",
        seller: "叫了只鸡",
        position: "天津市城建大学",
        price: "152",
        isFinish: "已完成"
      },
      {
        wid: "7465",
        wName: "yhrtg",
        wTelephone: "13333333333",
        oid: "89465132",
        oName: "gyihbjk",
        oTelephone: "13333333333",
        seller: "叫了只鸡",
        position: "天津市城建大学",
        price: "152",
        isFinish: "已完成"
      },
      {
        wid: "7465",
        wName: "yhrtg",
        wTelephone: "13333333333",
        oid: "89465132",
        oName: "gyihbjk",
        oTelephone: "13333333333",
        seller: "叫了只炸鸡",
        position: "天津市城建大学",
        price: "152",
        isFinish: "未完成"
      },
      {
        wid: "7465",
        wName: "yhrtg",
        wTelephone: "13333333333",
        oid: "89465132",
        oName: "gyihbjk",
        oTelephone: "13333333333",
        seller: "叫了只鸡",
        position: "天津市城建大学",
        price: "152",
        isFinish: "未完成"
      },
      {
        wid: "7465",
        wName: "yhrtg",
        wTelephone: "13333333333",
        oid: "89465132",
        oName: "gyihbjk",
        oTelephone: "13333333333",
        seller: "叫了只炸鸡",
        position: "天津市城建大学",
        isFinish: "未完成"
      },
      {
        wid: "7465",
        wName: "yhrtg",
        wTelephone: "13333333333",
        oid: "89465132",
        oName: "gyihbjk",
        oTelephone: "13333333333",
        seller: "叫了只鸡",
        position: "天津市城建大学",
        isFinish: "已完成"
      }
    ]
    const columns = [
      { prop: "oid", label: "订单号" },
      { prop: "seller", label: "卖家" },
      { prop: "oName", label: "买家姓名" },
      { prop: "position", label: "送货地址" },
      { prop: "wName", label: "送货人" },
      { prop: "wTelephone", label: "送货人电话" },
      { prop: "isFinish", label: "是否完成" }
    ]
    const selectContent = [
      {
        label: "卖家",
        prop: "seller",
        labels: ["叫了只鸡", "叫了只炸鸡"]
      },
      {
        label: "是否完成",
        prop: "isFinish",
        labels: ["未完成", "已完成"]
      }
    ]
    const buttonNames=['修改信息','增加信息']
    return { tableData, columns, selectContent,buttonNames }
  }
})
</script>
