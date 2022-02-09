import { RouteRecordRaw } from "vue-router";
import Login from './Login.vue'
import UserAccountsWrapper from './UserAccountsWrapper.vue'

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/accounts',
    component: UserAccountsWrapper
  }
];