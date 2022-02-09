<template>
  <div class="user-accounts-wrapper">
    User Accounts Wrapper Component
  </div>
</template>

<script lang="ts">
import useUser from "@/hooks/http-hooks/useUser";
import { UserAccountsResponse } from "@/http/responses";
import { defineComponent, ref } from "vue";

const UserAccountsWrapper = defineComponent({
  setup() {
    const { getUserAccounts } = useUser();
    const userAccounts = ref<UserAccountsResponse[]>([])

    getUserAccounts().then(ua => {
      userAccounts.value = ua

      console.log(ua);
    })
  }
})

export default UserAccountsWrapper
</script>