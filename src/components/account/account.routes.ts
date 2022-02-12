import { RouteRecordRaw } from "vue-router";

export const AccountRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/account'
  },
  {
    path: '/account',
    component: () => import('./AccountModule.vue')
  }
]