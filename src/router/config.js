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
          meta: {
            icon: 'profile'
          },
          component: () => import('@/pages/query/Journal'),
        },
        {
          path: '/query/:id/info',
          name: '详情',
          meta: {
            invisible:'true'
          },
          component: ()=> import('@/pages/query/info')
        },
        {
          path: '/report',
          name: '报告',
          meta: {
            invisible:'true'
          },
          component: () => import('@/pages/report'),
        },
        {
          path: 'info',
          name: '报警',
          meta: {
            icon: 'fund'
          },
          component: () => import('@/pages/Info/Info'),
        },
        {
          path: '/info/:id/details',
          name: '报警详情',
          meta: {
            invisible:'true'
          },
          component: ()=> import('@/pages/Info/details')
        },
        {
          path: 'server',
          name: '服务',
          meta: {
            icon: 'desktop'
          },
          component: () => import('@/pages/server/server'),
        },
        {
          path: '/server/info',
          name: '服务详情',
          meta: {
            invisible:'true'
          },
          component: () => import('@/pages/server/info'),
        },
        {
          path: 'manage',
          name: '管理',
          meta: {
            icon: 'setting'
          },
          component: () => import('@/pages/manage/Manage'),
        },
        {
          path: '/manage/new',
          name: '新增管理',
          meta: {
            invisible:'true'
          },
          component: () => import('@/pages/manage/new'),
        },
      ]
    },
  ]
}

export default options
