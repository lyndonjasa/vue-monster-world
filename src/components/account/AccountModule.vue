<template>
  <div class="account-module-wrapper">
    Account Module Wrapper
  </div>
</template>

<script lang="ts">
import useAccount from '@/hooks/http-hooks/useAccount';
import useLoaders from '@/hooks/store-hooks/useLoaders';
import { AccountDetails } from '@/models/account/account-details';
import { defineComponent, ref } from 'vue'

const AccountModule = defineComponent({
  setup() {
    const { getAccountDetails } = useAccount();
    const { showScreenLoader } = useLoaders();
    const account = ref<AccountDetails>(undefined);

    const loadAccount = async () => {
      showScreenLoader.value = true;
      try {
        account.value = await getAccountDetails();
        console.log(account.value);
      } catch (error) {
        console.log(error)
      } finally {
        showScreenLoader.value = false;
      }
    }
    
    loadAccount();
  },
})

export default AccountModule;
</script>