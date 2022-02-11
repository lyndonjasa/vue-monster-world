import { RouteRecordRaw } from "vue-router";

export const AccountRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./AccountModule.vue')
  }
]