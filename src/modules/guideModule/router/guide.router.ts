import type { RouteRecordRaw } from 'vue-router';

export const guideRouter: RouteRecordRaw[] = [
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('../guideView.vue'),
  },
];
