import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据统计', icon: 'dashboard' }
    }]
  },

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

  {
    path: '/offline',
    component: Layout,
    redirect: '/offline/list',
    name: 'Offline',
    meta: { title: '线下订单管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/offline/list'),
        meta: { title: '全部订单', icon: 'form' }
      }
    ]
  },
  
  {
    path: '/master',
    component: Layout,
    redirect: '/master/list',
    name: 'Master',
    meta: { title: '师傅管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/master/list'),
        meta: { title: '全部师傅', icon: 'form' }
      }
    ]
  },


  {
    path: '/businessman',
    component: Layout,
    redirect: '/businessman/list',
    name: 'Businessman',
    meta: { title: '商家管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/businessman/list'),
        meta: { title: '全部商家', icon: 'form' }
      }
    ]
  },

  {
    path: '/member',
    component: Layout,
    redirect: '/member/list',
    name: 'Member',
    meta: { title: '用户管理', icon: 'form' },
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
        component: () => import('@/views/member/feedback/list'),
        meta: { title: '用户反馈' }
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/income',
    name: 'Finance',
    meta: { title: '财务管理', icon: 'form' },
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
      }
    ]
  },

  {
    path: '/show',
    component: Layout,
    redirect: '/show/list',
    name: 'Show',
    meta: { title: '工程秀管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/show/list'),
        meta: { title: '全部工程秀', icon: 'form' }
      }
    ]
  },

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
      // {
      //   path: 'category',
      //   name: 'Category',
      //   component: () => import('@/views/setting/category/list'),
      //   meta: { title: '类目设置' }
      // },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/setting/account/list'),
        meta: { title: '账号管理' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/setting/role/list'),
        meta: { title: '角色管理' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
