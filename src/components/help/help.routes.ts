import { RouteRecordRaw } from "vue-router";

export const HelpRoutes: RouteRecordRaw[] = [
  {
    path: '/help',
    redirect: '/help/elements',
    component: () => import('./HelpModule.vue'),
    children: [
      {
        path: 'elements',
        component: () => import('./content/Elements.vue')
      },
      {
        path: 'talents',
        component: () => import('./content/Talents.vue')
      },
      {
        path: 'evolutions',
        component: () => import('./content/Evolutions.vue')
      },
      {
        path: 'cards',
        component: () => import('./content/Cards.vue')
      },
      {
        path: 'credits',
        component: () => import('./content/Credits.vue')
      }
    ]
  }
]