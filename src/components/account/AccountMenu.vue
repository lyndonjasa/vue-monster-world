<template>
  <div class="account-menu-wrapper">
    <p class="account-menu-title">Account Menu</p>
    <div class="menu-items-container">
      <div class="menu-item app-ingame-btn" 
        v-for="r in routes" 
        :key="r.name"
        :class="{ 'active': isActive(r.route) }"
        @click="reroute(r.route)">
        {{ r.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router';

interface MenuRoute {
  name: string;
  route: string;
}

const AccountMenu = defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const routes: MenuRoute[] = [
      {
        name: 'Home',
        route: '/account'
      },
      {
        name: 'Monsters',
        route: '/account/monsters'
      },
      {
        name: 'Cards',
        route: '/account/cards'
      },
      {
        name: 'Inventory',
        route: '/account/inventory'
      }
    ]

    const isActive = (selectedRoute: string) => {
      return route.path === selectedRoute
    }

    const reroute = (selectedRoute: string) => {
      router.push(selectedRoute);
    }

    return {
      isActive,
      reroute,
      routes
    }
  }
})

export default AccountMenu;
</script>

<style lang="scss" scoped>
.account-menu-wrapper {
  padding: 20px;
  width: calc(100% - 40px);

  .account-menu-title {
    font-size: 16px;
  }

  .menu-item {
    margin: 10px;
  }
}
</style>
