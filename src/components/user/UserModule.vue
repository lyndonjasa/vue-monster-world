<template>
  <div class="user-module-wrapper">
    <div class="user-module-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const UserModule = defineComponent({

})

export default UserModule;
</script>

<style lang="scss" scoped>
.user-module-wrapper {
  background: rgb(2,0,36);
  background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(43,43,179,1) 100%);
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .user-module-container {
    height: calc(100% - 20px);
    background-image: url('../../assets/login_bg.jpg');
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    width: calc(100% - 40px);
    display: flex;
    justify-content: center;
  }
}
</style>