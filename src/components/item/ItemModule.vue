<template>
  <div class="item-module-wrapper">
    <div class="item-module-body">
      <item-list></item-list>
      <purchased-item-list></purchased-item-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ItemList from './ItemList.vue'
import PurchasedItemList from './PurchasedItemList.vue'

const ItemModule = defineComponent({
  components: {
    ItemList,
    PurchasedItemList
  }
})

export default ItemModule
</script>

<style lang="scss" scoped>
.item-module-body {
  width: 1000px;
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;

  > * {
    height: 100%;
  }
}
</style>