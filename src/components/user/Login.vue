<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-form-container app-transluscent-div">
        <div class="form-control text-username">
          <app-base-input 
            v-model="username"
            placeholder="Username"
            :required="true"
            updateOn="change"
            :errorMessage="usernameError">
          </app-base-input>
        </div>
        <div class="form-control">
          <app-base-input 
            v-model="password" 
            placeholder="Password" 
            type="password" 
            :required="true" 
            updateOn="change"
            :errorMessage="passwordError">
          </app-base-input>
        </div>
        <button class="app-generic-btn" @click="userLogin">Login</button>
        <button class="app-generic-btn" @click="userLogin">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useUser from '@/hooks/useUser'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router';

const Login = defineComponent({
  setup() {
    const { login } = useUser();
    const router = useRouter();

    const schema = {
      username(value: string) {
        if (validateValue(value)) {
          return true
        } else {
          return 'Username is required'
        }
      },
      password(value: string) {
        if (validateValue(value)) {
          return true
        } else {
          return 'Password is required'
        }
      }
    }

    const validateValue = (value: string): boolean => {
      return value !== undefined && value.trim() !== '';
    }

    const form = useForm({
      validationSchema: schema
    })

    const { value: username, errorMessage: usernameError } = useField<string>('username')
    const { value: password, errorMessage: passwordError } = useField<string>('password')

    const userLogin = async () => {
      const result = await form.validate();
      if (result.valid) {
        try {
          const result = await login(username.value, password.value);
          console.log(result);
          router.push('/battle');
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }

    return {
      username,
      password,
      usernameError,
      passwordError,
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
        margin: 25px auto;

        &.text-username {
          margin-top: 40px;
        }
      }

      button {
        margin: 0 20px;
      }
    }
  }
}
</style>