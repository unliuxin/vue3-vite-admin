import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/layout.vue';
const serviceAdmin: RouteRecordRaw[] = [
    {
        path: '/service-admin',
        component: Layout,
        redirect: '/service-admin/home',
        meta: {
            orderNo: 1,
            title: '服务商首页',
            hideChildrenInMenu: true,
        },
        children: [
            {
                path: '/home',
                name: 'serviceHomePage',
                component: () => import('/@/views/dashboard/serviceAdmin/home/index.vue'),
                meta: {
                    title: '服务商首页',
                },
            },
            {
                path: 'human',
                name: 'serviceHumanPage',
                component: () => import('/@/views/dashboard/serviceAdmin/digitalHuman/index.vue'),
                meta: {
                    title: '我的数字人',
                },
            },
            {
                path: 'invite',
                name: 'serviceInvitePage',
                component: () => import('/@/views/serviceAdmin/inviteSerice/index.vue'),
                meta: {
                    title: '我邀请的服务商',
                },
            },
            {
                path: 'user',
                name: 'serviceUserPage',
                component: () => import('/@/views/serviceAdmin/myUser/index.vue'),
                meta: {
                  title: '我的用户',
                },
              },
        ]
    },
]
export default serviceAdmin;