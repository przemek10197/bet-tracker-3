import type { RouteRecordRaw } from 'vue-router';

export const settingsRouter: RouteRecordRaw[] = [
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../settingsView.vue'),
  },
];
