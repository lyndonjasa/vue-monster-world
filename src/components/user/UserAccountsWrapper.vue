<template>
  <div class="user-accounts-wrapper">
    <div class="user-accounts-header app-transluscent-div">
      <p class="user-account-detail">Username: <span class="username">{{ username }}</span></p>
      <button class="app-generic-btn" @click="logout">Logout</button>
    </div>
    <div class="user-accounts-body">
      <user-account v-for="account in userAccounts" 
        :key="account.accountId" 
        :account="account"
        @remove-account="deleteAccount(account.accountId)">
      </user-account>
      <user-account v-if="userAccounts.length < 3"
        :template="true">
      </user-account>
    </div>
  </div>
</template>

<script lang="ts">
import useCatchRouter from "@/hooks/catch-hooks/useCatchRouter";
import useUser from "@/hooks/http-hooks/useUser";
import useAccount from "@/hooks/http-hooks/useAccount";
import { UserAccountsResponse } from "@/http/responses";
import { defineComponent, ref } from "vue";
import UserAccount from "./UserAccount.vue";
import useAppStateCore from "@/hooks/store-hooks/useAppStateCore";
import { useRouter } from "vue-router";

const UserAccountsWrapper = defineComponent({
  components: {
    UserAccount
  },
  setup() {
    const router = useRouter();
    const { username, clearState } = useAppStateCore();
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

    const logout = () => {
      clearState();
      router.push({ name: 'login' });
    }

    return {
      username,
      userAccounts,
      deleteAccount,
      logout
    }
  }
})

export default UserAccountsWrapper
</script>

<style lang="scss" scoped>
.user-accounts-wrapper {

  .user-accounts-body {
    display: flex;
    margin-top: 50px;
    justify-content: space-around;
    width: 900px;
  }

  .user-accounts-header {
    padding: 20px;
    height: 40px;
    margin: 0 auto 25px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 18px;

      .username {
        font-family: 'Plaguard';
      }
    }
  }
}
</style>