import Layout from '@/layout/layout.vue';
const plat: any[] = [
    {
        path: '/plat',
        component: Layout,
        redirect: '/plat/log',
        icon: 'CalendarOutlined',
        meta: {
            orderNo: 2,
            title: '平台管理',

        },
        children: [
            {
                path: '/plat/log',
                name: 'log',
                icon: 'ContainerOutlined',
                component: () => import('@/views/plat/log/index.vue'),
                meta: {
                    title: '日志管理',
                },
            },
        ]
    },
]
export default plat;