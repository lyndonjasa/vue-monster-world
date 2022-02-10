<template>
  <div class="user-accounts-wrapper">
    <user-account v-for="account in userAccounts" 
      :key="account.accountId" 
      :account="account"
      @remove-account="deleteAccount(account.accountId)">
    </user-account>
    <user-account v-if="userAccounts.length < 3"
      :template="true">
    </user-account>
  </div>
</template>

<script lang="ts">
import useCatchRouter from "@/hooks/catch-hooks/useCatchRouter";
import useUser from "@/hooks/http-hooks/useUser";
import useAccount from "@/hooks/http-hooks/useAccount";
import { UserAccountsResponse } from "@/http/responses";
import { defineComponent, ref } from "vue";
import UserAccount from "./UserAccount.vue";

const UserAccountsWrapper = defineComponent({
  components: {
    UserAccount
  },
  setup() {
    const { getUserAccounts } = useUser();
    const { deleteUserAccount } = useAccount();
    const { redirectToLogin } = useCatchRouter();
    const userAccounts = ref<UserAccountsResponse[]>([])

    const loadUserAccounts = () => {
      getUserAccounts()
        .then(ua => {
          userAccounts.value = ua

          console.log(ua);
        })
        .catch(() => {
          redirectToLogin();
        })
    }

    loadUserAccounts();

    const deleteAccount = async (accountId: string) => {
      await deleteUserAccount(accountId);
      loadUserAccounts();
    }

    return {
      userAccounts,
      deleteAccount
    }
  }
})

export default UserAccountsWrapper
</script>

<style lang="scss" scoped>
.user-accounts-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 900px;
}
</style>