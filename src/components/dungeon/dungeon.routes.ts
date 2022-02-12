import { RouteRecordRaw } from "vue-router";

export const DungeonRoutes: RouteRecordRaw[] = [
  {
    path: '/dungeons',
    component: () => import('./DungeonModule.vue')
  }
]