import { RouteRecordRaw } from "vue-router";
import Login from './Login.vue'
import UserAccountsWrapper from './UserAccountsWrapper.vue'
import UserModule from './UserModule.vue';

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: UserModule,
    children: [
      {
        path: '',
        component: Login
      },
      {
        path: 'accounts',
        component: UserAccountsWrapper
      }
    ]
  },
];