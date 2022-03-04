<template>
  <div class="purchased-item-list-wrapper app-transluscent-div">
    <perfect-scrollbar>
      <div class="purchased-items-container">
        <p class="cart-header">CART ITEMS</p>
        <cart-item class="cart-items" v-for="item in cartItems" 
          :key="item.itemId" 
          :item="item"
          v-model="item.quantity"
          @remove="removeItemFromCart" />
      </div>
    </perfect-scrollbar>
    <div class="purchase-actions">
      <div class="purchase-currency-details">
        <div class="currency-key">Required Amount:</div>
        <div class="currency-value">{{ totalRequiredAmount }}</div>
        <div class="currency-key">Owned Currency:</div>
        <div class="currency-value">{{ ownedCurrency }}</div>
      </div>
      <div class="app-ingame-btn" v-if="enablePurchase" @click="showConfirmationModal = true">Purchase</div>
    </div>
  </div>
  <base-modal v-if="showConfirmationModal"
    message="Proceed Item Purchase?"
    @close="showConfirmationModal = false"
    @accept="onItemPurchase"
    closeText="Cancel"
    acceptText="Proceed" />
</template>

<script lang="ts">
import useErrors from '@/hooks/store-hooks/useErrors';
import useGlobaData from '@/hooks/store-hooks/useGlobalData';
import useLoaders from '@/hooks/store-hooks/useLoaders';
import { CartItemsKey } from '@/injections/item.injection';
import { computed, defineComponent, inject, ref } from 'vue'
import { PurchaseItem } from '@/http/requests/purchase-items.request';
import CartItem from './CartItem.vue';
import useItems from '@/hooks/http-hooks/useItems';

const PurchasedItemList = defineComponent({
  components: {
    CartItem
  },
  setup() {
    const { accountDetails, reloadAccount } = useGlobaData();
    const { buyItems } = useItems();
    const { throwMessage } = useErrors();
    const { showModalLoader } = useLoaders();
    const showConfirmationModal = ref<boolean>(false);

    const ownedCurrency = computed(() => {
      if (accountDetails.value) {
        return accountDetails.value.currency
      } else {
        return 0;
      }
    });

    const cartItems = inject(CartItemsKey);

    const totalRequiredAmount = computed(() => {
      return cartItems.value.map(ci => ci.quantity * ci.cost).reduce((a,b) => a + b, 0);
    });

    const enablePurchase = computed(() => {
      return ownedCurrency.value > totalRequiredAmount.value && cartItems.value.length > 0;
    });

    const removeItemFromCart = (itemId: string) => {
      cartItems.value = cartItems.value.filter(ci => ci.itemId !== itemId);
    }

    const onItemPurchase = async () => {
      showConfirmationModal.value = false;
      showModalLoader.value = true;

      try {
        const items: PurchaseItem[] = cartItems.value.map(ci => { 
          return {
            itemId: ci.itemId,
            quantity: ci.quantity
          }
         });

         await buyItems(items);
         await reloadAccount();

         cartItems.value = [];
      } catch (error) {
        console.log(error);
        throwMessage(error.response.data);
      } finally {
        showModalLoader.value = false;
      }
    }

    return {
      cartItems,
      ownedCurrency,
      totalRequiredAmount,
      enablePurchase,
      showConfirmationModal,
      removeItemFromCart,
      onItemPurchase
    }
  }
})

export default PurchasedItemList;
</script>

<style lang="scss" scoped>
.purchased-item-list-wrapper {
  width: 300px;

  .ps {
    height: calc(100% - 170px);
    background-color: transparent;
  }

  .purchased-items-container {
    .cart-header {
      font-size: 18px;
      text-align: center;
      margin-top: 25px;
    }
  }

  .purchase-actions {
    padding: 10px;
    height: 170px;

    .purchase-currency-details {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;

      > * {
        flex-basis: 50%;
        margin: 10px 0;
      }

      .currency-value {
        text-align: right;
      }
    }
  }
}
</style>
