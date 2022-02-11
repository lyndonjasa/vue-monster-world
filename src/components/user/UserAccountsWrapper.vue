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
        @remove-account="deleteAccount(account.accountId)"
        @select-account="loadAccount(account.accountId)">
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
import useLoaders from "@/hooks/store-hooks/useLoaders";
import { delayAction } from "@/helpers/delay.helper";

const UserAccountsWrapper = defineComponent({
  components: {
    UserAccount
  },
  setup() {
    const { showModalLoader, showScreenLoader } = useLoaders();
    const router = useRouter();
    const { username, accountId, clearState } = useAppStateCore();
    const { getUserAccounts } = useUser();
    const { deleteUserAccount } = useAccount();
    const { redirectToLogin } = useCatchRouter();
    const userAccounts = ref<UserAccountsResponse[]>([])

    const loadUserAccounts = async () => {
      showModalLoader.value = true;
      try {
        const ua = await getUserAccounts();
        await delayAction(1000);

        userAccounts.value = ua
      } catch (error) {
        redirectToLogin();
      } finally {
        showModalLoader.value = false;
      }
    }

    loadUserAccounts();

    const deleteAccount = async (accountId: string) => {
      await deleteUserAccount(accountId);
      loadUserAccounts();
    }

    const loadAccount = async (id: string) => {
      accountId.value = id;

      showScreenLoader.value = true;
      // TODO: add loading of global values here
      await delayAction(2000);
      showScreenLoader.value = false;

      router.push('/');
    }

    const logout = () => {
      clearState();
      router.push({ name: 'login' });
    }

    return {
      username,
      userAccounts,
      deleteAccount,
      loadAccount,
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