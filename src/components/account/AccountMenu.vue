<template>
  <div class="account-menu-wrapper">
    <p class="account-menu-title">Account Menu</p>
    <div class="menu-items-container">
      <router-link 
        v-for="r in routes"
        :to="r.route"
        :key="r.name"
        custom v-slot="{ navigate, isActive }">
        <div class="menu-item app-ingame-btn" :class="{ 'active': isActive }" @click="navigate">
          {{ r.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';

interface MenuRoute {
  name: string;
  route: string;
}

const AccountMenu = defineComponent({
  setup() {
    const router = useRouter();

    const routes: MenuRoute[] = [
      {
        name: 'Home',
        route: '/account/home'
      },
      {
        name: 'Monsters',
        route: '/account/monsters'
      },
      {
        name: 'Inventory',
        route: '/account/inventory'
      }
    ]

    const reroute = (selectedRoute: string) => {
      router.push(selectedRoute);
    }

    return {
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
