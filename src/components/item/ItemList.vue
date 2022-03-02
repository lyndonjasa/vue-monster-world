<template>
  <div class="item-list-wrapper">
    <base-div-loader v-if="showLoader" />
    <perfect-scrollbar v-else>
      <div class="item-list-container">
        <p class="item-header">ITEM LIST</p>
        <menu-item v-for="item in items" 
          :key="item._id" 
          :item="item"
          :selected="item._id === selectedItem._id"
          @select="selectedItem = item" />
      </div>
    </perfect-scrollbar>
    <div class="item-details-wrapper">
      <item-details :item="selectedItem" />
    </div>
  </div>
</template>

<script lang="ts">
import { ItemResponse } from '@/http/responses/item-response';
import { defineComponent, ref } from 'vue'
import useItems from '@/hooks/http-hooks/useItems';
import ItemDetails from './ItemDetails.vue';
import MenuItem from './MenuItem.vue';

const ItemList = defineComponent({
  components: {
    ItemDetails,
    MenuItem
  },
  setup() {
    const { getItemList } = useItems();

    const items = ref<ItemResponse[]>([]);
    const selectedItem = ref<ItemResponse>(undefined);
    const showLoader = ref<boolean>(false);

    const loadItems = async () => {
      showLoader.value = true;
      items.value = await getItemList();
      selectedItem.value = items.value[0];
      showLoader.value = false;
    }
    
    loadItems();

    return {
      showLoader,
      items,
      selectedItem
    }
  }
})

export default ItemList;
</script>

<style lang="scss" scoped>
.item-list-wrapper {
  width: 650px;
  height: 100%;

  .ps {
    height: calc(100% - 125px);
  }

  .item-list-container {
    padding: 20px;
  }

  .item-header {
    font-size: 22px;
    padding: 10px 15px;
  }
}
</style>
