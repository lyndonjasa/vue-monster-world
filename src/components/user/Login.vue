<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-form-container app-black-div">
        <div class="form-control">
          <app-base-input v-model="username" placeholder="Username"></app-base-input>
        </div>
        <div class="form-control">
          <app-base-input v-model="password" placeholder="Password" type="password"></app-base-input>
        </div>
        <button @click="userLogin">Test</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useUser from '@/hooks/useUser'

const Login = defineComponent({
  setup() {
    const { login } = useUser();

    const username = ref<string>(undefined);
    const password = ref<string>(undefined);

    const userLogin = () => {
      login(username.value, password.value)
        .then(r => {
          console.log(r);
        })
        .catch(e => {
          console.log(e);
        })
    }

    return {
      username,
      password,
      userLogin
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
    display: flex;
    justify-content: center;

    .login-form-container {
      align-self: center;
      height: 300px;
      width: 500px;
      text-align: center;

      .form-control {
        width: 400px;
        margin: 40px auto;
      }
    }
  }
}
</style>