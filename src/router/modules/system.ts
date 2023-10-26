import Layout from '@/layout/layout.vue';
const system: any[] = [
    {
        path: '/system',
        component: Layout,
        redirect: '/system/user',
        icon: 'BookOutlined',
        meta: {
            orderNo: 1,
            title: '系统管理',

        },
        children: [
            {
                path: '/system/user',
                name: 'user',
                icon: 'UserOutlined',
                component: () => import('@/views/system/user/index.vue'),
                meta: {
                    title: '用户管理',
                },
            },
            {
                path: '/system/department',
                name: 'department',
                icon: 'TeamOutlined',
                component: () => import('@/views/system/department/index.vue'),
                meta: {
                    title: '部门管理',
                },
            },
        ]
    },
]
export default system;