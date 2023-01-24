import type { RouteRecordRaw } from 'vue-router';

export const betsRouter: RouteRecordRaw[] = [
  {
    path: '/bets',
    name: 'Bets',
    component: () => import('../betsView.vue'),
  },
];
