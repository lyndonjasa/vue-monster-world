<template>
  <div class="account-module-wrapper" v-if="account">
    <account-details :account="account"></account-details>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import useAccount from '@/hooks/http-hooks/useAccount';
import useLoaders from '@/hooks/store-hooks/useLoaders';
import AccountDetails from './AccountDetails.vue'
import { AccountDetails as Account } from '@/models/account/account-details';
import { defineComponent, provide, ref } from 'vue'
import { ReloadAccountKey } from '@/injections/account.injection'

const AccountModule = defineComponent({
  components: {
    AccountDetails
  },
  setup() {
    const { getAccountDetails } = useAccount();
    const { showScreenLoader } = useLoaders();
    const account = ref<Account>(undefined);

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
    provide(ReloadAccountKey, loadAccount);
    
    loadAccount();

    return {
      account
    }
  },
})

export default AccountModule;
</script>