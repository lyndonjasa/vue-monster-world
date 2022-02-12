import { RouteRecordRaw } from "vue-router";

export const BestiaryRoutes: RouteRecordRaw[] = [
  {
    path: '/bestiary',
    component: () => import('./BestiaryModule.vue')
  }
]