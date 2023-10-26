import { defineStore } from 'pinia';
import { MenuType } from '/@/models/common';
import { useRouter } from 'vue-router';
interface UseMenuStore {
  // 权限代码列表
  permCodeList: string[] | number[];
  isDynamicAddedRoute: boolean; // 动态路由是否添加
  menuList: MenuType[];
}
const router = useRouter();
export const useMenuStore = defineStore({
  id: 'menu',
  state: (): UseMenuStore => ({
    isDynamicAddedRoute: false,
    permCodeList: [],
    menuList: []
  }),
  getters: {
    getMenuList(): MenuType[] {
      return this.menuList
    },
  },
  actions: {
    SET_MENUS(menus:  MenuType[]) {
      this.menuList = menus;
    },
  }
})