<template>
  <div class="main-layout-wrapper">
    <div class="main-layout-container">
      <div class="navigation-bar app-transluscent-div">
      </div>
      <div class="route-view-container">
        <div class="view-item">
          <router-view></router-view>
        </div>
      </div>
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
  color: white;

  .main-layout-container {
    max-width: calc(100% - 60px);
    min-width: 1200px;
    margin: 0 auto;

    .navigation-bar {
      height: 50px;
    }

    .route-view-container {
      height: calc(100% - 50px);
      display: flex;
      align-items: center;

      .view-item {
        min-height: calc(100% - 40px);
        min-width: 100%;
      }
    }
  }
}
</style>