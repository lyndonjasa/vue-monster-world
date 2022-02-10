<template>
  <div class="signup-wrapper">
    <div class="signup-container app-transluscent-div">
      <p class="app-text-header">User Sign Up</p>
      <div class="signup-form">
        <div class="form-control name-controls">
          <div class="control">
            <base-input placeholder="First Name"
              v-model="firstName"
              :required="true"
              updateOn="blur"
              :errorMessage="firstNameError">
            </base-input>
          </div>
          <div class="control">
            <base-input placeholder="Last Name"
              v-model="lastName"
              :required="true"
              updateOn="blur"
              :errorMessage="lastNameError">
            </base-input>
          </div>
        </div>
        <div class="form-control">
          <base-input placeholder="Email"
            v-model="email"
            type="email"
            :required="true"
            updateOn="blur"
            :errorMessage="emailError">
          </base-input>
        </div>
        <div class="form-control">
          <base-input placeholder="Username"
            v-model="username"
            :required="true"
            updateOn="blur"
            :errorMessage="usernameError">
          </base-input>
        </div>
        <div class="form-control">
          <base-input placeholder="Password"
            v-model="password"
            type="password"
            :required="true"
            updateOn="blur"
            :errorMessage="passwordError">
          </base-input>
        </div>
      </div>
      <div class="signup-footer">
        <button class="app-generic-btn" @click="reroute('/login')">Back</button>
        <button class="app-generic-btn" @click="submitForm">Signup</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useValidators from '@/hooks/useValidators';
import { useField, useForm } from 'vee-validate';
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';

const Signup = defineComponent({
  setup() {
    const router = useRouter();
    const { validateRequired, validateLength, validateEmail } = useValidators();

    type Validator = boolean | string

    const validationSchema = {
      firstName: (value: string): Validator => {
        if (!validateRequired(value)) {
          return 'First Name is required'
        }

        if (!validateLength(value, 1, 50)) {
          return 'Max characters for First Name is 50'
        }

        return true
      },
      lastName: (value: string): Validator => {
        if (!validateRequired(value)) {
          return 'Last Name is required'
        }

        if (!validateLength(value, 1, 50)) {
          return 'Max characters for Last Name is 50'
        }

        return true
      },
      email: (value: string): Validator => {
        if (!validateRequired(value)) {
          return 'Email is required'
        }

        if (!validateEmail(value)) {
          return 'Invalid Email value'
        }

        return true
      },
      username: (value: string): Validator => {
        if (!validateRequired(value)) {
          return 'Username is required'
        }

        if (!validateLength(value, 6, 25)) {
          return 'Username must be between 6 to 25 characters'
        }

        return true
      },
      password: (value: string): Validator => {
        if (!validateRequired(value)) {
          return 'Password is required'
        }

        if (!validateLength(value, 8)) {
          return 'Password must be at least 8 characters'
        }

        return true
      },
    }

    const form = useForm({
      validationSchema
    })

    const { value: firstName, errorMessage: firstNameError } = useField<string>('firstName');
    const { value: lastName, errorMessage: lastNameError } = useField<string>('lastName');
    const { value: email, errorMessage: emailError } = useField<string>('email');
    const { value: username, errorMessage: usernameError, setErrors: setUsernameErrors } = useField<string>('username');
    const { value: password, errorMessage: passwordError } = useField<string>('password');

    const reroute = (route: string) => {
      router.push(route);
    }

    const submitForm = async () => {
      const result = await form.validate();
      if (result.valid) {
        alert('form valid');
      }
    }

    return {
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      email,
      emailError,
      username,
      usernameError,
      password,
      passwordError,
      reroute,
      submitForm
    }
  }
})

export default Signup;
</script>

<style lang="scss" scoped>
.signup-wrapper {
  align-self: center;

  .signup-container {
    padding: 40px;
    width: 400px;

    .signup-form .form-control {
      margin: 15px 0;

      &.name-controls {
        display: flex;
        justify-content: space-between;

        .control {
          width: 190px;
        }
      }
    }

    .signup-footer {
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>