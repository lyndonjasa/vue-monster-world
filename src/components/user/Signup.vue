<template>
  <div class="signup-wrapper">
    <div class="signup-container app-transluscent-div">
      <p class="app-text-header">User Sign Up</p>
      <div class="signup-form">
        <div class="form-control name-controls">
          <div class="control">
            <base-input placeholder="First Name"></base-input>
          </div>
          <div class="control">
            <base-input placeholder="Last Name"></base-input>
          </div>
        </div>
        <div class="form-control">
          <base-input placeholder="Email"></base-input>
        </div>
        <div class="form-control">
          <base-input placeholder="Username"></base-input>
        </div>
        <div class="form-control">
          <base-input placeholder="Password"></base-input>
        </div>
      </div>
      <div class="signup-footer">
        <button class="app-generic-btn">Back</button>
        <button class="app-generic-btn">Signup</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const Signup = defineComponent({
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