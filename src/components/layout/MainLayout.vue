<template>
  <div class="main-layout-wrapper">
    <div class="main-layout-container">
      <router-view></router-view>
    </div>
  </div>
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
  display: flex;

  .main-layout-container {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    align-self: center;
    margin: 0 auto;
  }
}
</style>