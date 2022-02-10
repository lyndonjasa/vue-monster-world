<template>
  <div class="create-account-wrapper">
    <div class="create-account-container app-transluscent-div">
      <p class="create-account-header app-text-header">Create Account</p>
      <div class="form-control account-name">
        <app-base-input 
          v-model="accountName"
          placeholder="Account Name"
          :required="true"
          updateOn="change"
          :errorMessage="accountNameError">
        </app-base-input>
      </div>
      <div class="starter-packs-container">
        <p>CHOOSE STARTER PACK:</p>
        <starter-pack></starter-pack>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useValidators from '@/hooks/useValidators'
import { useField } from 'vee-validate'
import { defineComponent, ref } from 'vue'
import StarterPack from './StarterPack.vue'

const CreateAccount = defineComponent({
  components: {
    StarterPack
  },
  setup() {
    const { validateRequired, validateLength } = useValidators();

    const accountNameValidation = (value: string) => {
      if (!validateRequired(value)) {
        return 'Account Name is required'
      }

      if (!validateLength(value, 6, 15)) {
        return 'Account Name must be between 6-15 characters'
      }

      return true;
    }

    const { value: accountName, errorMessage: accountNameError } = useField<string>('fieldName', accountNameValidation)

    const starterGroup = ref<number>(1);

    return {
      accountName,
      accountNameError,
      starterGroup
    }
  },
})

export default CreateAccount
</script>

<style lang="scss" scoped>
.create-account-wrapper {
  display: flex;
  align-items: center;

  .create-account-container {
    width: 400px;
    padding: 40px;

    .account-name {
      margin-top: 35px;
    }

    .starter-packs-container {
      margin-top: 20px;
    }
  }
}
</style>