<template>
  <div class="main-layout-wrapper"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const MainLayout = defineComponent({
})

export default MainLayout;
</script>

<style lang="scss" scoped>
.main-layout-wrapper {
  min-height: 660px;
  height: calc(100vh - 90px);
  width: 100%;
  background-image: url('../../assets/layout_bg.jpg');
  background-position: center;
}
</style>