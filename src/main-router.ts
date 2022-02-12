import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AccountRoutes } from "./components/account/account.routes";
import { BestiaryRoutes } from "./components/bestiary/bestiary.routes";
import { DungeonRoutes } from "./components/dungeon/dungeon.routes";
import { HelpRoutes } from "./components/help/help.routes";
import { ItemRoutes } from "./components/item/item.route";
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
      ...AccountRoutes,
      ...ItemRoutes,
      ...DungeonRoutes,
      ...BestiaryRoutes,
      ...HelpRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;