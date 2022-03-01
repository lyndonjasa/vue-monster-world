<template>
  <perfect-scrollbar>
    <div class="item-list-wrapper">
      <base-div-loader v-if="showLoader" />
      <div class="item-list-container" v-else>
        <p class="item-header">ITEM LIST</p>
        <item-details v-for="item in items" :key="item._id" :item="item" />
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script lang="ts">
import { ItemResponse } from '@/http/responses/item-response';
import { defineComponent, ref } from 'vue'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import useItems from '@/hooks/http-hooks/useItems';
import ItemDetails from './ItemDetails.vue';

const ItemList = defineComponent({
  components: {
    ItemDetails
  },
  setup() {
    const { getItemList } = useItems();

    const items = ref<ItemResponse[]>([]);
    const showLoader = ref<boolean>(false);

    const loadItems = async () => {
      showLoader.value = true;
      items.value = await getItemList();
      showLoader.value = false;
    }
    
    loadItems();

    return {
      showLoader,
      faCartPlus,
      items
    }
  }
})

export default ItemList;
</script>

<style lang="scss" scoped>
.item-list-wrapper {
  width: 650px;

  .item-header {
    font-size: 22px;
    padding: 10px 15px;
  }
}
</style>
