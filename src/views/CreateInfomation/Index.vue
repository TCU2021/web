<template>
  <div class="container">
    <ElementInfo :labels="labels"></ElementInfo>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ElementInfo from "@/components/ElementInfo.vue"
export default defineComponent({
  components: {
    ElementInfo
  },
  setup() {
    const labels = ["订单编号","用户编号","用户姓名","用户联系电话","骑手姓名","骑手联系电话"]
    return { labels }
  }
})
</script>

<style scoped lang="scss"></style>
