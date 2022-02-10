import { RouteRecordRaw } from "vue-router";
import Login from './Login.vue'
import UserAccountsWrapper from './UserAccountsWrapper.vue'
import CreateAccount from './CreateAccount.vue'
import Signup from './Signup.vue';

const UserModule = () => import('./UserModule.vue')
export const UserRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: UserModule,
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
        component: UserAccountsWrapper
      },
      {
        path: 'accounts/create',
        component: CreateAccount
      }
    ]
  },
];