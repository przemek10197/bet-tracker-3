import type { RouteRecordRaw } from 'vue-router';

export const targetsRouter: RouteRecordRaw[] = [
  {
    path: '/targets',
    name: 'Targets',
    component: () => import('../targetsView.vue'),
  },
];
