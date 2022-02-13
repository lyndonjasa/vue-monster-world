<template>
  <div class="account-inventory-wrapper wrapper-div">
    <div class="inventory-menu">
      <router-link 
        v-for="r in menuRoutes"
        :to="r.route"
        :key="r.name"
        custom v-slot="{ navigate, isActive }">
        <div class="card-menu-btn app-ingame-btn" :class="{ 'active': isActive }" @click="navigate">
          {{ r.name }}
        </div>
      </router-link>
    </div>
    <div class="inventory-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface RouteDetails {
  route: string;
  name: string;
}

const InventoryModule = defineComponent({
  setup() {
    const menuRoutes: RouteDetails[] = [
      {
        route: '/account/inventory/cards',
        name: 'Cards'
      },
      {
        route: '/account/inventory/items',
        name: 'Items'
      }
    ];

    return {
      menuRoutes
    }
  }
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
