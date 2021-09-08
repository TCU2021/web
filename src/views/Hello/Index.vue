<template>
  <div>
    <div class="container">
      <div class="orderCount">
        <div class="part">
          <span class="text">当前共有</span>
          <span class="count">100</span>
          <span class="text">个订单正在进行中</span>
        </div>
        <div class="part">
          <span class="text">已处理</span>
          <span class="count">100</span>
          <span class="text">个订单</span>
        </div>
        <div class="part">
          <span class="text">共处理过</span>
          <span class="count">100</span>
          <span class="text">个订单</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.text{
  font-size: 30px;
}
.count{
  font-size: 40px;
  margin: 0 10px;
}
</style>
