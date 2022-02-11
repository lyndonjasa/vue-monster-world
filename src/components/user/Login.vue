<template>
  <div class="login-form-container app-transluscent-div">
    <div class="form-control text-username">
      <base-input 
        v-model="username"
        placeholder="Username"
        :required="true"
        updateOn="change"
        :errorMessage="usernameError">
      </base-input>
    </div>
    <div class="form-control">
      <base-input 
        v-model="password" 
        placeholder="Password" 
        type="password" 
        :required="true" 
        updateOn="change"
        :errorMessage="passwordError">
      </base-input>
    </div>
    <button class="app-generic-btn" @click="userLogin">Login</button>
    <button class="app-generic-btn" @click="reroute('/signup')">Sign Up</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useUser from '@/hooks/http-hooks/useUser'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router';
import useValidators from '@/hooks/useValidators';
import useAppStateCore from '@/hooks/store-hooks/useAppStateCore';
import useLoaders from '@/hooks/store-hooks/useLoaders';
import { delayAction } from '@/helpers/delay.helper';

const Login = defineComponent({
  setup() {
    const { showModalLoader } = useLoaders();
    const { login } = useUser();
    const router = useRouter();
    const { validateRequired } = useValidators();
    const appState = useAppStateCore();

    const schema = {
      username(value: string) {
        if (validateRequired(value)) {
          return true
        } else {
          return 'Username is required'
        }
      },
      password(value: string) {
        if (validateRequired(value)) {
          return true
        } else {
          return 'Password is required'
        }
      }
    }

    const form = useForm({
      validationSchema: schema
    })

    const { value: username, errorMessage: usernameError } = useField<string>('username')
    const { value: password, errorMessage: passwordError } = useField<string>('password')

    const userLogin = async () => {
      const result = await form.validate();
      if (result.valid) {
        showModalLoader.value = true;
        try {
          const result = await login(username.value, password.value);
          
          appState.userId.value = result.userId
          appState.username.value = result.username

          await delayAction(1000);

          router.push('/accounts');
        } catch (error) {
          console.log(error.response.data);
        } finally {
          showModalLoader.value = false;
        }
      }
    }

    const reroute = (route: string) => {
      router.push(route);
    }

    return {
      username,
      password,
      usernameError,
      passwordError,
      userLogin,
      reroute
    }
  },
})

export default Login
</script>

<style lang="scss" scoped>
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
    width: 95px;
  }
}
</style>