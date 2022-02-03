import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BattleField from './components/battle/BattleField.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BattleField
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;