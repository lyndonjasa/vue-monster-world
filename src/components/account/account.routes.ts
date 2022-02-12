import { RouteRecordRaw } from "vue-router";

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
        path: '',
        component: () => import('./home/HomeModule.vue')
      },
      {
        path: 'monsters',
        component: () => import('./monsters/AccountMonsterModule.vue')
      },
      {
        path: 'cards',
        component: () => import('./cards/CardsModule.vue')
      },
      {
        path: 'inventory',
        component: () => import('./inventory/InventoryModule.vue')
      }
    ]
  }
]