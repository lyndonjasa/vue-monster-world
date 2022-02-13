import { RouteRecordRaw } from "vue-router";
import CardInventory from './inventory/CardInventory.vue'
import ItemsInventory from './inventory/ItemsInventory.vue'

export const AccountRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/account'
  },
  {
    path: '/account',
    redirect: '/account/home',
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
          {
            path: 'items',
            component: ItemsInventory
          }
        ]
      }
    ]
  }
]