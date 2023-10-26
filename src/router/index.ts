import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes, asyncRoutes } from './routes';

export function setupRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: [...constantRoutes, ...asyncRoutes]
  });
}
