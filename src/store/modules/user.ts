import { defineStore } from 'pinia';
import { UserSimpleInfoType } from '@/models/common';
interface UserState {
  userInfo: Nullable<UserSimpleInfoType>;
  token: string;
  // apps: IApp[];
  // dicts: Dicts[];
  wsConnectStatus: string;
  menuId: string;
  isBind: number | null;
  loginWay: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    token: 'sadsadsdasds',
    // apps: [],
    // dicts: [],
    wsConnectStatus: '',
    menuId: '',
    isBind: null,
    loginWay: ''
  }),
  getters: {
    // dutyTypes: (state) => getDictsChildren(state.dicts, 'staff-duty')
  },
  actions: {
    SET_TOKEN(token: string) {
      this.token = token;
    },
    SET_USERINFO(userInfo: UserSimpleInfoType) {
      this.userInfo = userInfo;
    },
    // SET_APPS(list: IApp[]) {
    //   this.apps = list;
    // },
    // SET_DICTS(dicts: Dicts[]) {
    //   this.dicts = dicts;
    // },

    SET_MENU_ID(menuId: string) {
      this.menuId = menuId;
    },
   
    // async login(loginForm: LoginAuthParams): Promise<{ code: number; msg: string }> {
    //   const { code, data, msg } = await loginAuth(loginForm);

    //   if (code === 200) {
    //     const { access_token } = data;
    //     this.SET_TOKEN(access_token);
    //   }

    //   return { code, msg };
    // },

    
    async getCurrentUserInfo() {
      // const { code, data, msg } = await getCurrentUserInfo();
      // if (code === 200) {
      //   this.SET_USERINFO(data);
      // } else {
      //   console.error(msg);
      // }
    },
    // async getDicts() {
    //   const { code, data, msg } = await getDictTree();
    //   if (code === 200) {
    //     this.SET_DICTS(data);
    //   } else {
    //     console.error(msg);
    //   }
    // },
    
    // async logout() {
    //   const { code, msg } = await logout(this.token);
    //   if (code === 200) {
    //     this.$reset();
    //     window.sessionStorage.clear();
    //     window.localStorage.removeItem('token');
    //   } else {
    //     console.error(msg);
    //   }
    // }
  },
  persist: {
    enabled: true,
    strategies: [
      { key: 'DICTS', paths: ['dicts'] },
      { key: 'TOKEN', storage: localStorage, paths: ['token'] },
      { key: 'USER_INFO', paths: ['userInfo'] },
    ]
  }
});
