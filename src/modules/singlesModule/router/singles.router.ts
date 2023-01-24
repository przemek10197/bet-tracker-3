import type { RouteRecordRaw } from 'vue-router';

export const singlesRouter: RouteRecordRaw[] = [
  {
    path: '/singles',
    name: 'Singles',
    component: () => import('../singlesView.vue'),
  },
];
