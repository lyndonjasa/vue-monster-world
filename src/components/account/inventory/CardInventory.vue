<template>
  <div class="account-cards-wrapper wrapper-div">
    <p class="card-title wrapper-title">ACCOUNT CARDS INVENTORY:</p>
    <div class="card-inventory" v-if="cards.length > 0">
      <div class="account-card" 
        v-for="card in cards" 
        :key="card.monsterName"
        :class="{ 'empty': card.quantity < 1 }">
        <card-details :card="card"></card-details>
      </div>
    </div>
    <div class="empty-inventory-message" v-else>
      Account has empty records of monster cards
    </div>
  </div>
</template>

<script lang="ts">
import useGlobaData from '@/hooks/store-hooks/useGlobalData';
import { defineComponent } from 'vue'
import CardDetails from './CardDetails.vue';

const CardsModule = defineComponent({
  components: {
    CardDetails
  },
  setup() {
    const { cards } = useGlobaData();

    return {
      cards
    }
  }
})

export default CardsModule;
</script>

<style lang="scss" scoped>
.account-cards-wrapper {

  .empty-inventory-message {
    font-size: 16px;
    margin-top: 10px;
  }

  .card-inventory {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;

    .account-card {
      flex-basis: 25%;
      display: flex;
      justify-content: center;
      margin-bottom: 35px;

      &.empty {
        filter: brightness(0.5);
      }
    }
  }
}
</style>