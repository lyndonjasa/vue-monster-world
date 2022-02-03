<template>
  <div class="login-wrapper">
    <div class="login-container">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const Login = defineComponent({
  setup() {
    const username = ref<string>(undefined);
    const password = ref<string>(undefined);

    return {
      username,
      password
    }
  },
})

export default Login
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: rgb(2,0,36);
  background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(43,43,179,1) 100%);
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-container {
    height: calc(100% - 20px);
    background-image: url('../../assets/login_bg.jpg');
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    width: calc(100% - 40px);
  }
}
</style>