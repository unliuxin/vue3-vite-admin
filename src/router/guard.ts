import { toRefs } from 'vue';
import { Router, RouteRecordRaw } from 'vue-router';
import { asyncRoutes } from '@/router/routes'
import { useUserStore } from '@/store/modules/user';
import { useMenuStore } from '@/store/modules/menu';
import NProgress from 'nprogress';

const whitePathList: any[] = ['/login'];
export function createGuard(router: Router): void {
  const userStore = useUserStore();
  const menuStore = useMenuStore();

  const { token, userInfo } = toRefs(userStore);
  const { menuList, isDynamicAddedRoute } = toRefs(menuStore);

  router.beforeEach(async (to, _, next) => {
    NProgress.start();

    //白名单路由直接跳转
    if (whitePathList.includes(to.path)) {
      if (token.value) {
        next('/dashboard');
        return;
      }

      next();
      return;
    }

    // 判断有无token
    if (!token.value) {
      next('/login');
      return;
    }

    if (!userInfo.value) {
      userStore.getCurrentUserInfo()
    }
    
    // 获取所有路由赋值到菜单
    if (!isDynamicAddedRoute.value) {
      console.log(asyncRoutes);
      // 对菜单进行排序
      asyncRoutes.sort((a:any, b:any) => {
        return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
      })
      asyncRoutes.forEach((route) => {
        router.addRoute(route as unknown as any)
      })
      // 静态路由，拿去router配置的路由赋值给菜单
      menuStore.SET_MENUS(asyncRoutes as any)
    }

    next();
  })
  router.afterEach(() => {
    NProgress.done();
  });
}