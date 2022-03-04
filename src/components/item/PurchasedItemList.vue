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
      <div class="app-ingame-btn" v-if="enablePurchase">Purchase</div>
    </div>
  </div>
</template>

<script lang="ts">
import useGlobaData from '@/hooks/store-hooks/useGlobalData';
import { CartItemsKey } from '@/injections/item.injection';
import { computed, defineComponent, inject } from 'vue'
import CartItem from './CartItem.vue';

const PurchasedItemList = defineComponent({
  components: {
    CartItem
  },
  setup() {
    const { accountDetails } = useGlobaData();

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

    return {
      cartItems,
      ownedCurrency,
      totalRequiredAmount,
      enablePurchase,
      removeItemFromCart
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
