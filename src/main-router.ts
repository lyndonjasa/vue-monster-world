import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from './components/user/Login.vue';
import BattleField from './components/battle/BattleField.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Login
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