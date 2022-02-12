import { RouteRecordRaw } from "vue-router";

export const HelpRoutes: RouteRecordRaw[] = [
  {
    path: '/help',
    component: () => import('./HelpModule.vue')
  }
]