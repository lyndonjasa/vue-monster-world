<template>
  <div class="create-account-wrapper">
    <div class="create-account-container app-transluscent-div">
      <p class="create-account-header app-text-header">Create Account</p>
      <div class="form-control account-name">
        <base-input 
          v-model="accountName"
          placeholder="Account Name"
          :required="true"
          updateOn="change"
          :errorMessage="accountNameError">
        </base-input>
      </div>
      <div class="starter-packs-container">
        <p>CHOOSE STARTER PACK:</p>
        <starter-pack v-for="pack in starterPacks" 
          :key="pack.group"
          :starterPack="pack"
          :selected="pack.group == selectedGroup"
          @select-pack="selectedGroup = $event">
        </starter-pack>
      </div>
      <div class="create-account-actions">
        <button class="app-generic-btn" @click="onBackClick">Back</button>
        <button class="app-generic-btn" @click="onCreateClick">Create</button>
      </div>
    </div>
  </div>
  <base-modal v-if="showCreateConfirmationModal" 
    message="Proceed creating this account?" 
    acceptText="Yes"
    closeText="No"
    @close="showCreateConfirmationModal = false"
    @accept="saveAccount">
  </base-modal>
</template>

<script lang="ts">
import useValidators from '@/hooks/useValidators'
import { useField } from 'vee-validate'
import { defineComponent, ref } from 'vue'
import StarterPack from './StarterPack.vue'
import useMonster from '@/hooks/http-hooks/useMonster';
import { StarterPackResponse } from '@/http/responses';
import { useRouter } from 'vue-router';

const CreateAccount = defineComponent({
  components: {
    StarterPack
  },
  setup() {
    const { validateRequired, validateLength } = useValidators();
    const { getStarterPacks } = useMonster();
    const router = useRouter();

    const accountNameValidation = (value: string) => {
      if (!validateRequired(value)) {
        return 'Account Name is required'
      }

      if (!validateLength(value, 6, 15)) {
        return 'Account Name must be between 6-15 characters'
      }

      return true;
    }

    const { 
      value: accountName, 
      errorMessage: accountNameError, 
      validate: validateAccountName 
    } = useField<string>('fieldName', accountNameValidation)

    const selectedGroup = ref<number>(1);
    const starterPacks = ref<StarterPackResponse[]>([]);

    const onBackClick = () => {
      router.push('/accounts');
    }

    const showCreateConfirmationModal = ref<boolean>(false);
    const onCreateClick = async () => {
      const result = await validateAccountName();
      if (result.valid) {
        showCreateConfirmationModal.value = true;
      }
    }

    const saveAccount = () => {
      console.log('Save Called');
      showCreateConfirmationModal.value = false
    }

    getStarterPacks().then(r => {
      starterPacks.value = r
    })

    return {
      accountName,
      accountNameError,
      selectedGroup,
      starterPacks,
      showCreateConfirmationModal,
      onBackClick,
      onCreateClick,
      saveAccount
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

    .create-account-actions {
      margin-top: 35px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>