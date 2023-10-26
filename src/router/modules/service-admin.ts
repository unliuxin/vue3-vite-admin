import Layout from '@/layout/layout.vue';
const serviceAdmin: any[] = [
    {
        path: '/service-admin',
        component: Layout,
        redirect: '/service-admin/home',
        icon: 'CalendarOutlined',
        meta: {
            orderNo: 3,
            title: '服务商首页',

        },
        children: [
            {
                path: '/service-admin/home',
                name: 'serviceHomePage',
                icon: 'CalendarOutlined',
                component: () => import('@/views/service-admin/home/index.vue'),
                meta: {
                    title: '服务商首页',
                },
            },
        ]
    },
]
export default serviceAdmin;