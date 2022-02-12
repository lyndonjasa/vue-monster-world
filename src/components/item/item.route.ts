import { RouteRecordRaw } from "vue-router";

export const ItemRoutes: RouteRecordRaw[] = [
  {
    path: '/items',
    component: () => import('./ItemModule.vue')
  }
]