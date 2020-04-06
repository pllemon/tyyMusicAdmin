const menuData = [
  {
    title: '客户服务',
    children: [
      {
        title: '新下单分配',
        path: '/order/list?status=1'
      },
      {
        title: '过时未跟单',
        path: '/order/list?status=12'
      },
      {
        title: '无法成交单',
        path: '/order/list?status=10'
      },
      {
        title: '已付款单',
        path: '/order/list?status=3'
      },
      {
        title: '审批抢单',
        path: '/order/list?status=4'
      },
      {
        title: '完工申款单',
        path: '/order/list'
      },
      {
        title: '申请尾款单',
        path: '/order/list'
      },
      {
        title: '用户客服',
        path: '/order/list',
        query: ''
      },
      {
        title: '系统通知',
        path: '/system/notice/list'
      },
    ]
  },
  {
    title: '人事管理',
    children: [
      {
        title: '用户列表',
        path: '/member/list'
      },
      {
        title: '师傅列表',
        path: '/master/list'
      },
      {
        title: '店主列表',
        path: '/businessman/list'
      },
      {
        title: '案例广场',
        path: '/show/list'
      },
    ]
  },
  {
    title: '实体店财务',
    children: [
      {
        title: '交易订单',
        path: '/offline/list'
      },
    ]
  },
  {
    title: '维修财务',
    children: [
      {
        title: '已付款的单',
        path: '/order/list?status=3'
      },
      {
        title: '完工申款单',
        path: '/order/list?status=3'
      },
      {
        title: '已付完工申款单', 
        path: '/order/list?status=3'
      },
      {
        title: '申请尾款单',
        path: '/order/list?status=3'
      },
      {
        title: '已付申请尾款单',
        path: '/order/list?status=3'
      }
    ]
  },
  {
    title: '系统设置',
    children: [
      {
        title: '广告管理',
        path: '/system/advert'
      },
      {
        title: '企业文化',
        path: '/system/about'
      },
      {
        title: '联系我们',
        path: '/system/concat'
      },
      {
        title: '用户协议',
        path: '/system/userAgreement'
      },
      {
        title: '师傅协议',
        path: '/system/masterAgreement'
      },
      {
        title: '商家协议',
        path: '/system/businessAgreement'
      },
      {
        title: '网点设置',
        path: '/setting/network'
      },
      {
        title: '账号管理',
        path: '/setting/account'
      },
    ]
  },
]

export {
  menuData
}