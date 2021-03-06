import { RouteRecordRaw } from "vue-router";
import Login from './Login.vue'
import UserAccountsWrapper from './UserAccountsWrapper.vue'
import CreateAccount from './CreateAccount.vue'
import Signup from './Signup.vue';
import { userRouteGuard } from "@/guards/app.guard";

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./UserModule.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'signup',
        component: Signup
      },
      {
        path: 'accounts',
        component: UserAccountsWrapper,
        beforeEnter: userRouteGuard
      },
      {
        path: 'accounts/create',
        component: CreateAccount,
        beforeEnter: userRouteGuard
      }
    ]
  },
];