<template>
  <div class="user-account-wrapper">
    <div class="user-account-details app-transluscent-div">
      <p class="user-account-name">{{ account.accountName }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { UserAccountsResponse } from "@/http/responses";
import { defineComponent, Prop } from "vue";

const UserAccount = defineComponent({
  props: {
    account: { required: true } as Prop<UserAccountsResponse>
  }
})

export default UserAccount;
</script>

<style lang="scss">
.user-account-details {
  width: 210px;
  padding: 20px;
  height: 350px;
  border: 5px solid transparent;

  &:hover {
    border-color: rgba(255,255,255,0.75);
    -webkit-box-shadow: 0px 0px 10px 10px rgba(255,255,255,0.75); 
    box-shadow: 0px 0px 10px 10px rgba(255,255,255,0.75);
  }

  .user-account-name {
    text-align: center;
    font-family: "Plaguard";
    font-size: 24px;
    padding-bottom: 15px;
    border-bottom: 2px solid white;
  }
}
</style>