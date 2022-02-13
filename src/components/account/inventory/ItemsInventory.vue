<template>
  <base-div-loader v-if="showLoader"></base-div-loader>
  <div class="account-items-wrapper wrapper-div" v-else>
    <p class="item-title wrapper-title">ACCOUNT ITEMS INVENTORY:</p>
    <div class="items-inventory" v-if="items.length > 0">
      <div class="item-details" v-for="item in items" :key="item.itemId">
        <p class="item-name">
          <fa-icon :icon="item.type === 'taming' ? faHeart : faScroll" :title="item.type" />
          {{ item.item }} <span class="item-quantity">x{{ item.quantity }}</span>
        </p>
        <p class="item-description">{{ item.description }}</p>
      </div>
    </div>
    <div class="empty-inventory-message" v-else>
      Account has empty records of items
    </div>
  </div>
</template>

<script lang="ts">
import useAccount from '@/hooks/http-hooks/useAccount';
import { ItemInventoryResponse } from '@/http/responses/item-inventory.response';
import { defineComponent, ref } from 'vue'
import { faScroll, faHeart } from '@fortawesome/free-solid-svg-icons'

const ItemsInventory = defineComponent({
  setup() {
    const showLoader = ref<boolean>(false);
    const { getAccountInventory } = useAccount();
    const items = ref<ItemInventoryResponse[]>([]);

    const loadInventory = async () => {
      showLoader.value = true;
      items.value = await getAccountInventory();
      showLoader.value = false;
    }

    loadInventory();

    return {
      showLoader,
      items,
      faScroll,
      faHeart
    }
  },
})

export default ItemsInventory
</script>

<style lang="scss" scoped>
.account-items-wrapper {
  .empty-inventory-message {
    font-size: 16px;
    margin-top: 10px;
  }

  .items-inventory {
    margin-top: 25px;

    .item-details {
      margin-bottom: 30px;

      .item-name {
        font-size: 16px;

        .item-quantity {
          font-size: 13px;
        }
      }

      .item-description {
        margin: 10px 0;
        width: 100%;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        font-size: 16px;
      }
    }
  }
}
</style>
