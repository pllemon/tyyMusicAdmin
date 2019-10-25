// 根据角色配置路由
import Layout from '@/layout'

export const mainAdminRoutes = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Order',
    meta: { title: '线上订单管理', icon: 'affiliations_li' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/order/list'),
        meta: { title: '线上订单', icon: 'affiliations_li' }
      }
    ]
  },

  {
    path: '/offline',
    component: Layout,
    redirect: '/offline/list',
    name: 'Offline',
    meta: { title: '线下订单管理', icon: 'exchange' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/offline/list'),
        meta: { title: '线下订单', icon: 'exchange' }
      }
    ]
  },
  
  {
    path: '/master',
    component: Layout,
    redirect: '/master/list',
    name: 'Master',
    meta: { title: '师傅管理', icon: 'namecard' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/master/list'),
        meta: { title: '全部师傅'}
      },
      {
        path: 'settlement',
        name: 'Settlement',
        component: () => import('@/views/master/settlement'),
        meta: { title: '月结工资'}
      }
    ]
  },


  {
    path: '/businessman',
    component: Layout,
    redirect: '/businessman/list',
    name: 'Businessman',
    meta: { title: '商家管理', icon: 'boss' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/businessman/list'),
        meta: { title: '全部商家'}
      },
      {
        path: 'settlement',
        name: 'Settlement',
        component: () => import('@/views/businessman/settlement'),
        meta: { title: '提现申请'}
      }
    ]
  },

  {
    path: '/member',
    component: Layout,
    redirect: '/member/list',
    name: 'Member',
    meta: { title: '用户管理', icon: 'group' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/member/list'),
        meta: { title: '全部用户'}
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/member/feedback'),
        meta: { title: '用户反馈' }
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/income',
    name: 'Finance',
    meta: { title: '财务管理', icon: 'coinpurse_line' },
    children: [
      {
        path: 'income',
        name: 'Income',
        component: () => import('@/views/finance/income'),
        meta: { title: '收入记录'}
      },
      {
        path: 'expend',
        name: 'Expend',
        component: () => import('@/views/finance/expend'),
        meta: { title: '支出记录' }
      },
      {
        path: 'points',
        name: 'Points',
        component: () => import('@/views/finance/points'),
        meta: { title: '积分记录' }
      }
    ]
  },

  {
    path: '/show',
    component: Layout,
    redirect: '/show/list',
    name: 'Show',
    meta: { title: '工程秀管理', icon: 'certificate_fil' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/show/list'),
        meta: { title: '工程秀管理', icon: 'certificate_fil' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/advert',
    name: 'System',
    meta: { title: '小程序设置', icon: 'setting' },
    children: [
      {
        path: 'advert',
        name: 'Advert',
        component: () => import('@/views/system/advert/list'),
        meta: { title: '首页广告' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/system/about'),
        meta: { title: '关于我们' }
      },
      {
        path: 'concat',
        name: 'Concat',
        component: () => import('@/views/system/concat'),
        meta: { title: '联系我们' }
      },
      {
        path: 'userAgreement',
        name: 'userAgreement',
        component: () => import('@/views/system/userAgreement'),
        meta: { title: '用户协议' }
      },
      {
        path: 'masterAgreement',
        name: 'masterAgreement',
        component: () => import('@/views/system/masterAgreement'),
        meta: { title: '师傅协议' }
      },
      {
        path: 'businessAgreement',
        name: 'businessAgreement',
        component: () => import('@/views/system/businessAgreement'),
        meta: { title: '商家协议' }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/network',
    name: 'Setting',
    meta: { title: '后台设置', icon: 'cloud_history' },
    children: [
      {
        path: 'network',
        name: 'Network',
        component: () => import('@/views/setting/network/list'),
        meta: { title: '网点设置' }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/setting/account/list'),
        meta: { title: '账号管理' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export const branchAdminRoutes = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Order',
    meta: { title: '线上订单管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/order/list'),
        meta: { title: '全部订单', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]


export const testAdminRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/advert',
    name: 'System',
    meta: { title: '小程序设置', icon: 'form' },
    children: [
      {
        path: 'advert',
        name: 'Advert',
        component: () => import('@/views/system/advert/list'),
        meta: { title: '首页广告' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/system/about'),
        meta: { title: '关于我们' }
      },
      {
        path: 'concat',
        name: 'Concat',
        component: () => import('@/views/system/concat'),
        meta: { title: '联系我们' }
      },
      {
        path: 'userAgreement',
        name: 'userAgreement',
        component: () => import('@/views/system/userAgreement'),
        meta: { title: '用户协议' }
      },
      {
        path: 'masterAgreement',
        name: 'masterAgreement',
        component: () => import('@/views/system/masterAgreement'),
        meta: { title: '师傅协议' }
      },
      {
        path: 'businessAgreement',
        name: 'businessAgreement',
        component: () => import('@/views/system/businessAgreement'),
        meta: { title: '商家协议' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/network',
    name: 'Setting',
    meta: { title: '后台设置', icon: 'form' },
    children: [
      {
        path: 'network',
        name: 'Network',
        component: () => import('@/views/setting/network/list'),
        meta: { title: '网点设置' }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/setting/account/list'),
        meta: { title: '账号管理' }
      }
    ]
  },
  
  { path: '*', redirect: '/404', hidden: true }
]