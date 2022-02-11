import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AccountRoutes } from "./components/account/account.routes";
import BattleField from './components/battle/BattleField.vue'
import MainLayout from './components/layout/MainLayout.vue'
import { UserRoutes } from "./components/user/user.routes";
import { accountRouteGuard } from "./guards/app.guard";

const routes: RouteRecordRaw[] = [
  ...UserRoutes,
  {
    path: '',
    component: MainLayout,
    beforeEnter: accountRouteGuard,
    children: [
      ...AccountRoutes
    ]
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