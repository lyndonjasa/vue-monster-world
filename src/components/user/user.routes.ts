import { RouteRecordRaw } from "vue-router";
import Login from './Login.vue'
import UserAccountsWrapper from './UserAccountsWrapper.vue'
import CreateAccount from './CreateAccount.vue'

const UserModule = () => import('./UserModule.vue')
export const UserRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: UserModule,
    children: [
      {
        path: '',
        name: 'login',
        component: Login
      },
      {
        path: 'accounts',
        component: UserAccountsWrapper
      },
      {
        path: 'create',
        component: CreateAccount
      }
    ]
  },
];