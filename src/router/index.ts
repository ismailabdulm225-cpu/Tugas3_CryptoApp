import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';

import CryptoPage from '../views/CryptoPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/CryptoPage'
  },
  {
    path: '/CryptoPage',
    name: 'CryptoPage',
    component: CryptoPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
