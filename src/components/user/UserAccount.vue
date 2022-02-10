<template>
  <div class="user-account-wrapper">
    <div class="user-account-details app-transluscent-div" v-if="!template">
      <p class="user-account-name app-text-header">{{ account.accountName }}</p>
      <div class="user-account-monsters">
        <div class="user-account-monster" v-for="monster in account.monsters" :key="monster.name">
          <base-monster-thumbnail :src="monsterThumbnail(monster.thumbnailName)" :title="monster.name"></base-monster-thumbnail>
          <div class="monster-details">
            <p>{{ monster.name }}</p>
            <p>Lvl. {{ monster.level }}</p>
            <base-element :element="monster.element"></base-element>
          </div>
        </div>
      </div>
      <div class="user-account-actions">
        <fa-icon :icon="faRightToBracket" title="Enter"></fa-icon>
        <fa-icon :icon="faTrashCan" title="Delete" @click="showDeleteModal = true"></fa-icon>
      </div>
    </div>

    <div class="user-account-details app-transluscent-div" v-if="template">
      <p class="user-account-name app-text-header">New Account</p>
      <div class="new-user-account">
        <p>Create New User Account</p>
      </div>
      <div class="user-account-actions">
        <fa-icon :icon="faCirclePlus" title="Create New Account"></fa-icon>
      </div>
    </div>
  </div>
  <app-base-modal v-if="showDeleteModal" 
    :message="`Are you sure you want to delete this account? ${account.accountName}`"
    @close="showDeleteModal = false"
    @accept="onAccountDelete"
    acceptText="Yes"
    closeText="Cancel">
  </app-base-modal>
</template>

<script lang="ts">
import { UserAccountsResponse } from "@/http/responses";
import { defineComponent, Prop, PropType, ref } from "vue";
import { faRightToBracket, faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

interface Emits {
  'onRemove-account'(accountId: string): boolean
}

interface Props extends Emits {
  account: UserAccountsResponse,
  template: boolean
}

const UserAccount = defineComponent({
  props: {
    account: { type: Object as PropType<UserAccountsResponse> } as Prop<UserAccountsResponse>,
    template: { default: false } as Prop<boolean>
  },
  emits: {
    'remove-account': (accountId: string) => accountId !== undefined
  },
  setup(props: Props, context) {
    const monsterThumbnail = (thumb: string) => {
      return require(`@/assets/thumbs/${thumb.replace(/\s+/g, '')}.jpg`)
    }

    const showDeleteModal = ref<boolean>(false);
    const onAccountDelete = (): void => {
      context.emit('remove-account', props.account.accountId)
    }

    return {
      monsterThumbnail,
      onAccountDelete,
      faRightToBracket,
      faTrashCan,
      faCirclePlus,
      showDeleteModal
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

  .new-user-account {
    padding: 35px 0px;
    font-size: 18px;
    text-align: center;
  }

  .user-account-monsters {
    height: 230px;
  }

  .user-account-monster {
    margin-top: 25px;
    display: flex;

    .monster-details {
      margin-left: 10px;
      font-size: 14px;
    }
  }

  .user-account-actions {
    height: 25px;
    display: flex;
    justify-content: center;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s ease-in;

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
  
  &:hover .user-account-actions {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s ease-out;
  }
}
</style>