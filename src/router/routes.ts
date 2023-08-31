import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/layout.vue';
// import HelpLayout from '@/layout/HelpLayout';

// 加载异步路由模块
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: () => import('@/views/exception/404.vue'),
  meta: {
    title: '404'
  }
};

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue')
      },
      // {
      //   path: 'app/:path(.*)*',
      //   name: 'SubApps',
      //   component: () => import('@/views/sub-app')
      // }
    ]
  },
  // {
  //   path: '/help',
  //   component: HelpLayout,
  //   children: [
  //     { path: 'faq', name: 'Faq', component: () => import('@/views/faq') },
  //     {
  //       path: 'history',
  //       name: 'History',
  //       component: () => import('@/views/history')
  //     }
  //   ]
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/login')
  // },
  // {
  //   path: '/access/build/authority',
  //   name: 'AuthToken',
  //   component: () => import('@/views/auth-token')
  // },
  // {
  //   path: '/500',
  //   name: '500',
  //   component: () => import('@/views/exception/500')
  // }
];

// 动态路由
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];
