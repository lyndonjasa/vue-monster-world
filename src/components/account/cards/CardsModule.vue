<template>
  <base-div-loader v-if="showLoader"></base-div-loader>
  <div class="account-cards-wrapper wrapper-div" v-else>
    <p class="card-title wrapper-title">ACCOUNT CARD INVENTORY:</p>
    <div class="card-inventory">
      <div class="account-card" 
        v-for="card in cardInventory.cards" 
        :key="card.monsterName"
        :class="{ 'empty': card.quantity < 1 }">
        <div class="card-details">
          <div class="card-thumbnail">
            <base-monster-thumbnail :src="getMonsterThumbnail(card.monsterName)" :title="`${card.quantity} ${card.monsterName} card(s)`" />
            <div class="card-quantity">{{ card.quantity }}</div>
          </div>
          <p class="card-name">{{ card.monsterName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { delayAction } from '@/helpers/delay.helper';
import { getMonsterThumbnail } from '@/helpers/monster.helper';
import useAccount from '@/hooks/http-hooks/useAccount';
import { CardInventoryResponse } from '@/http/responses';
import { defineComponent, ref } from 'vue'

const CardsModule = defineComponent({
  setup() {
    const { getAccountCards } = useAccount();
    const showLoader = ref<boolean>(false);
    const cardInventory = ref<CardInventoryResponse>(undefined);

    const loadCards = async () => {
      showLoader.value = true;
      cardInventory.value = await getAccountCards();
      

      await delayAction(1000);
      showLoader.value = false;
    }
    
    loadCards();

    return {
      showLoader,
      cardInventory,
      getMonsterThumbnail
    }
  }
})

export default CardsModule;
</script>

<style lang="scss" scoped>
.account-cards-wrapper {

  .card-inventory {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;

    .account-card {
      flex-basis: 20%;
      display: flex;
      justify-content: center;
      margin-bottom: 35px;

      &.empty {
        filter: brightness(0.5);
      }

      .card-details {
        .card-thumbnail {
          display: flex;
          justify-content: center;

          .card-quantity {
            position: absolute;
            padding: 5px 8px;
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 999px;
            margin-left: 55px;
            margin-top: -10px;
            font-size: 12px;
          }
        }

        .card-name {
          margin-top: 10px;
          font-size: 15px;
        }
      }
    }
  }
}
</style>