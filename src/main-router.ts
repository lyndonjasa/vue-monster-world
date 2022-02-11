import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BattleField from './components/battle/BattleField.vue'
import MainLayout from './components/layout/MainLayout.vue'
import { UserRoutes } from "./components/user/user.routes";

const routes: RouteRecordRaw[] = [
  ...UserRoutes,
  {
    path: '',
    component: MainLayout
  },
  {
    path: '/battle',
    component: BattleField
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;