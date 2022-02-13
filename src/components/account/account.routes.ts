import { RouteRecordRaw } from "vue-router";
import CardInventory from './inventory/CardInventory.vue'

export const AccountRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/account'
  },
  {
    path: '/account',
    component: () => import('./AccountModule.vue'),
    children: [
      {
        path: 'home',
        component: () => import('./home/HomeModule.vue')
      },
      {
        path: 'monsters',
        component: () => import('./monsters/AccountMonsterModule.vue')
      },
      {
        path: 'inventory',
        redirect: '/account/inventory/cards',
        component: () => import('./inventory/InventoryModule.vue'),
        children: [
          {
            path: 'cards',
            component: CardInventory
          },
        ]
      }
    ]
  }
]