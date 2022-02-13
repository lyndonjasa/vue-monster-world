<template>
  <div class="account-inventory-wrapper wrapper-div">
    <div class="inventory-menu">
      <div class="app-ingame-btn card-menu-btn">Cards</div>
      <div class="app-ingame-btn card-menu-btn">Items</div>
    </div>
    <div class="inventory-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const InventoryModule = defineComponent({
})

export default InventoryModule;
</script>

<style lang="scss" scoped>
.account-inventory-wrapper {
  display: flex;
  height: 100%;

  .inventory-menu {
    width: 250px;

    .card-menu-btn {
      width: 170px;
      margin-bottom: 10px;
    }
  }

  .inventory-body {
    width: calc(100% - 250px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
