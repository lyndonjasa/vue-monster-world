<template>
  <div class="account-module-wrapper" v-if="account">
    <account-details :account="account"></account-details>
    <div class="account-module-body">
      <perfect-scrollbar>
        <div class="account-route-view app-transluscent-div">
          <router-view></router-view>
        </div>
      </perfect-scrollbar>
      <div class="account-menu app-transluscent-div">
        <account-menu></account-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useAccount from '@/hooks/http-hooks/useAccount';
import useLoaders from '@/hooks/store-hooks/useLoaders';
import AccountDetails from './AccountDetails.vue'
import AccountMenu from './AccountMenu.vue';
import { AccountDetails as Account } from '@/models/account/account-details';
import { defineComponent, provide, ref } from 'vue'
import { ReloadAccountKey } from '@/injections/account.injection'

const AccountModule = defineComponent({
  components: {
    AccountDetails,
    AccountMenu
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

<style lang="scss" scoped>
.account-module-body {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 175px);

  .ps {
    padding: 20px;
    width: 900px;
  }

  .account-menu {
    width: 250px;
  }
}
</style>