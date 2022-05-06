import TabsView from '@/layouts/tabs/TabsView'
// import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'analysis',
          name: '分析页',
          meta: {
            icon: 'dashboard'
          },
          component: () => import('@/pages/dashboard/analysis'),
        },
        {
          path: 'query',
          name: '日志查询',
          // meta: {
          //   icon: 'dashboard'
          // },
          component: () => import('@/pages/query/Journal'),
        },
        {
          path: 'error',
          name: '错误统计',
          // meta: {
          //   icon: 'dashboard'
          // },
          component: () => import('@/pages/error/ErrorInfo'),
        },
        {
          path: 'info',
          name: '报警管理',
          // meta: {
          //   icon: 'dashboard'
          // },
          component: () => import('@/pages/Info/Info'),
        },
      ]
    },
  ]
}

export default options
