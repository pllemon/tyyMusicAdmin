const menuData = [
  {
    id: '1',
    title: '客户服务',
    children: [
      {
        id: '1-1',
        title: '新订单分配',
        path: '/order/list?status=1&menu=1-1&section=1'
      },
      {
        id: '1-12',
        title: '过时未跟单',
        path: '/order/list?status=12&menu=1-12&section=1'
      },
      {
        id: '1-11',
        title: '客户取消单',
        path: '/order/list?status=11&menu=1-11&section=1'
      },
      {
        id: '1-2',
        title: '待支付单',
        path: '/order/list?status=2&menu=1-2&section=1'
      },
      {
        id: '1-3',
        title: '待发布单',
        path: '/order/list?status=3&menu=1-3&section=1'
      },
      {
        id: '1-4',
        title: '审批抢单',
        path: '/order/list?status=4&menu=1-4&section=1'
      },
      {
        id: '1-5',
        title: '正在施工单',
        path: '/order/list?status=5&menu=1-5&section=1'
      },
      {
        id: '1-6',
        title: '待客户验收单',
        path: '/order/list?status=6&menu=1-6&section=1'
      },
      {
        id: '1-7',
        title: '待店长验收单',
        path: '/order/list?status=7&menu=1-7&section=1'
      },
      {
        id: '1-8',
        title: '完工申款单',
        path: '/order/list?status=8&cashout_status=3&menu=1-8&section=1'
      },
      {
        id: '1-9',
        title: '申请尾款单',
        path: '/order/list?status=8&cashout_status=4&menu=1-9&section=1'
      },
      {
        id: '1-20',
        title: '系统公告',
        path: '/system/notice'
      },
      {
        id: '1-21',
        title: '用户反馈',
        path: '/member/feedback'
      },
    ]
  },
  {
    id: '2',
    title: '人事管理',
    children: [
      {
        id: '2-1',
        title: '用户列表',
        path: '/member/list'
      },
      {
        id: '2-2',
        title: '师傅列表',
        path: '/master/list'
      },
      {
        id: '2-3',
        title: '店长列表',
        path: '/shopowner/list'
      },
      {
        id: '2-4',
        title: '商家列表',
        path: '/businessman/list'
      },
      {
        id: '2-5',
        title: '案例广场',
        path: '/show/list'
      },
    ]
  },
  {
    id: '3',
    title: '实体店财务',
    children: [
      {
        id: '3-1',
        title: '交易订单',
        path: '/offline/list'
      },
    ]
  },
  {
    id: '4',
    title: '维修财务',
    children: [
      {
        id: '4-1',
        title: '已付款的单',
        path: '/order/list?status=3&menu=4-1&section=4'
      },
      {
        id: '4-2',
        title: '完工申款单',
        path: '/order/list?status=8&cashout_status=3&menu=4-2&section=4'
      },
      {
        id: '4-3',
        title: '已付完工申款单', 
        path: '/order/list?status=8&cashout_status=1&menu=4-3&section=4'
      },
      {
        id: '4-4',
        title: '申请尾款单',
        path: '/order/list?status=8&cashout_status=4&menu=4-4&section=4'
      },
      {
        id: '4-5',
        title: '已付申请尾款单',
        path: '/order/list?status=8&cashout_status=2&menu=4-5&section=4'
      }
    ]
  },
  {
    id: '5',
    title: '系统设置',
    children: [
      {
        id: '5-1',
        title: '广告管理',
        path: '/system/advert'
      },
      {
        id: '5-2',
        title: '企业文化',
        path: '/system/about'
      },
      {
        id: '5-3',
        title: '联系我们',
        path: '/system/concat'
      },
      {
        id: '5-4',
        title: '用户协议',
        path: '/system/userAgreement'
      },
      {
        id: '5-5',
        title: '师傅协议',
        path: '/system/masterAgreement'
      },
      {
        id: '5-6',
        title: '商家协议',
        path: '/system/businessAgreement'
      },
      {
        id: '5-7',
        title: '网点列表',
        path: '/setting/network'
      },
      {
        id: '5-8',
        title: '账号管理',
        path: '/setting/account'
      },
    ]
  },
]

export {
  menuData
}