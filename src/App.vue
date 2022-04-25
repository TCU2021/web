<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({})
</script>

<style lang="scss">
.mask {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
