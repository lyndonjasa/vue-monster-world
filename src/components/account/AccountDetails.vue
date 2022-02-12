<template>
  <div class="account-details-wrapper app-transluscent-div">
    <div class="account-details row no-margin">
      <div class="w-100">
        <span class="account-name">{{ account.accountName }}</span> ({{ account._id }})
      </div>
      <div class="w-45">Currency:</div>
      <div class="w-55">{{ account.currency }}</div>
      <div class="w-45">Monsters Unlocked:</div>
      <div class="w-55"><span class="monsters-unlocked">{{ account.unlockedMonsters.length }}</span></div>
      <div class="w-45">Tamer Rank:</div>
      <div class="w-55">Bronze Tamer</div>
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
  padding: 20px 10px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;

  .account-details {
    margin-left: 20px;
    width: 385px;
    display: flex;
    flex-wrap: wrap;

    > * {
      margin: 3px 0px;
    }

    .w-100 {
      width: 100%;
      margin-top: 0px;
      margin-bottom: 10px;
    }

    .w-45 {
      width: 45%;
    }

    .w-55 {
      width: 55%;
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