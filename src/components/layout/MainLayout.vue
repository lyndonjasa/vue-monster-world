<template>
  <div class="main-layout-wrapper">
    <div class="main-layout-container">
      <div class="navigation-bar app-transluscent-div">
        <div class="nav-items">
          <router-link class="nav-item" to="/">ACCOUNT</router-link>
          <router-link class="nav-item" to="/items">ITEMS</router-link>
          <router-link class="nav-item" to="/bestiary">BESTIARY</router-link>
          <router-link class="nav-item" to="/dungeons">DUNGEONS</router-link>
          <router-link class="nav-item" to="/help">HELP</router-link>
        </div>
        <div class="change-account">
          <fa-icon :icon="faPeopleArrowsLeftRight" title="Switch Account" @click="reroute('/accounts')" />
        </div>
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
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'vue-router'

const MainLayout = defineComponent({
  setup() {
    const router = useRouter();

    const reroute = (route: string) => {
      router.push(route);
    } 

    return {
      faPeopleArrowsLeftRight,
      reroute
    }
  }
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
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 0.5);
      justify-content: space-between;

      .nav-items {
        display: flex;
        font-size: 24px;

        .nav-item {
          margin: 0 10px;
          text-decoration: none;
          color: inherit;

          &:hover {
            color: rgba(255, 255, 255, 1);
            cursor: pointer;
          }

          &.router-link-active {
            color: rgba(255, 255, 255, 1);
          }
        }
      }

      svg {
        height: 25px;
        margin: 0 20px;

        &:hover {
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        }
      }
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