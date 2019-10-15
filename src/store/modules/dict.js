const state = {
  changeType: ['查看', '添加', '编辑', '删除', '审核', '指派'],
  showType: {
    1: '显示',
    2: '隐藏'
  },
  enableType: {
    1: '启用',
    4: '禁用'
  },
  originType: {
    1: '小程序',
    2: '后台'
  },
  orderStatus: {
    1: '待后台审核',
    2: '待客户支付定金',
    3: '待后台派单',
    4: '师傅报名中',
    5: '师傅施工中',
    6: '待客户支付尾款',
    7: '待客户评价',
    8: '已完成',
    10: '已取消'
  },
  offlineStatus: {
    waitconfirm: '待商家确认',
    success: '已完成',
    cancel: '已取消'
  },
  linkType: {
    0: '没链接',
    1: '链接小程序',
    2: '外链'
  },
  recordStatus: { // 商家状态
    0: '未申请',
    1: '审核通过',
    2: '未审核',
    3: '已驳回',
    4: '禁用'
  },
  incomeType: {
    1: '订单定金',
    2: '订单尾款',
    3: '平台佣金'
  },
  expendType: {
    1: '师傅工资',
    2: '商家提现'
  },
  pointsType: {
    1: '商家支付佣金'
  },
  roleType: {
    1: '总部管理员',
    2: '分部管理员',
    3: '开发测试账号'
  }
}

const mutations = {
 
}

const actions = {
 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
