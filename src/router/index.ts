import { createRouter, createWebHistory } from 'vue-router';

import { targetsRouter } from '@/modules/targetsModule/router/targets.router';
import { guideRouter } from '@/modules/guideModule/router/guide.router';
import { settingsRouter } from '@/modules/settingsModule/router/settings.router';
import { singlesRouter } from '@/modules/singlesModule/router/singles.router';
import { betsRouter } from '@/modules/betsModule/router/bets.router';

const defaultRoute = '/bets';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: '',
      redirect: defaultRoute,
    },
    ...betsRouter,
    ...guideRouter,
    ...settingsRouter,
    ...singlesRouter,
    ...targetsRouter,
  ],
});

export default router;
