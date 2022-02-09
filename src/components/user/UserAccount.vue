<template>
  <div class="user-account-wrapper">
    <div class="user-account-details app-transluscent-div">
      <p class="user-account-name">{{ account.accountName }}</p>
      <div class="user-account-monsters">
        <div class="user-account-monster" v-for="monster in account.monsters" :key="monster.name">
        <div class="monster-thumbnail"></div>
          <div class="monster-details">
            <p>{{ monster.name }}</p>
            <p>Lvl. {{ monster.level }}</p>
          </div>
        </div>
      </div>
      <div class="user-account-actions">
        <fa-icon :icon="faRightToBracket" title="Enter"></fa-icon>
        <fa-icon :icon="faTrashCan" title="Delete"></fa-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { UserAccountsResponse } from "@/http/responses";
import { defineComponent, Prop } from "vue";
import { faRightToBracket, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const UserAccount = defineComponent({
  props: {
    account: { required: true } as Prop<UserAccountsResponse>
  },
  setup() {
    return {
      faRightToBracket,
      faTrashCan
    }
  }
})

export default UserAccount;
</script>

<style lang="scss" scoped>
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

  .user-account-monsters {
    height: 230px;
  }

  .user-account-monster {
    margin-top: 25px;
    display: flex;

    .monster-thumbnail {
      height: 50px;
      width: 50px;
      background-color: yellow;
    }

    .monster-details {
      margin-left: 10px;
      font-size: 14px;
    }
  }

  .user-account-actions {
    height: 25px;
    display: flex;
    justify-content: center;

    svg {
      height: 25px;
      margin: 0 10px;
      cursor: pointer;
      color: rgba(255,255,255,0.65);

      &:hover {
        color: rgba(255,255,255,1);
      }
    }
  }
}
</style>