<template>
  <div class="account-details-wrapper app-transluscent-div">
    <div class="account-details">
      <p class="account-name">{{ account.accountName }}</p>
      <p>AID: {{ account._id }}</p>
      <p>Monsters Unlocked: <span class="monsters-unlocked">{{ account.unlockedMonsters.length }}</span></p>
      <p>Tamer Rank: Bronze Tamer</p>
    </div>
    <div class="account-party">
      <p>PARTY COMPOSITION:</p>
      <div class="party-monster" v-for="monster in account.party" :key="monster.monster.name">
        <base-monster-thumbnail 
          :src="getMonsterThumbnail(monster.monster.name)"
          :title="monster.monster.name">
        </base-monster-thumbnail>
        <p class="monster-details">
          <base-element :element="monster.monster.element"></base-element>
          Lvl. {{ monster.level }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getMonsterThumbnail } from '@/helpers/monster.helper'
import { AccountDetails as Account } from '@/models/account/account-details'
import { defineComponent, Prop } from 'vue'

const AccountDetails = defineComponent({
  props: {
    account: { required: true } as Prop<Account>
  },
  setup() {
    return {
      getMonsterThumbnail
    }
  }
})

export default AccountDetails
</script>

<style lang="scss" scoped>
.account-details-wrapper {
  padding: 10px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;

  .account-details {
    margin-left: 20px;

    p {
      margin  : 5px 0;
    }

    .account-name {
      font-family: 'Plaguard';
      font-size: 28px;
    }
  }

  .account-party {
    display: flex;
    width: 300px;
    flex-wrap: wrap;

    > p {
      width: 100%;
      text-indent: 20px;
      margin-bottom: 10px;
    }

    .party-monster {
      display: flex;
      flex-wrap: wrap;
      width: 70px;
      margin: 0 15px;
      justify-content: flex-end;

      .monster-details {
        margin-top: 5px;
      }
    }
  }
}
</style>