<template>
  <base-div-loader v-if="showLoader"></base-div-loader>
  <div class="account-cards-wrapper wrapper-div" v-else>
    Account Cards Module
  </div>
</template>

<script lang="ts">
import { delayAction } from '@/helpers/delay.helper';
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
      showLoader
    }
  }
})

export default CardsModule;
</script>

<style lang="scss" scoped>

</style>