import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BattleField from './components/battle/BattleField.vue'
import MainLayout from './components/layout/MainLayout.vue'
import { UserRoutes } from "./components/user/user.routes";
import { accountRouteGuard } from "./guards/app.guard";

const routes: RouteRecordRaw[] = [
  ...UserRoutes,
  {
    path: '',
    component: MainLayout,
    beforeEnter: accountRouteGuard
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