const state = {
  changeType: ['查看', '添加', '编辑', '删除', '审核', '指派'],
  showType: {
    1: '启用',
    2: '禁用'
  },
  enableType: {
    1: '启用',
    4: '禁用'
  },
  identityType: {
    0: '未申请',
    1: '正常',
    2: '待审核',
    3: '已驳回',
    4: '禁用'
  },
  originType: {
    1: '小程序',
    2: '后台'
  },
  orderStatus: {
    1: '待审核',
    2: '待客户支付',
    3: '待发布',
    4: '待派单',
    5: '师傅施工中',
    6: '待客户验收',
    7: '待店长验收',
    8: '完成验收',
    10: '已取消',
    11: '客户已取消',
    12: '过时未跟单'
  },
  cashoutStatus: {
    0: '未结算',
    1: '已经结算了第一次',
    2: '已经结算了两次',
    3: '申请第一次提现中',
    4: '申请第二次',
  },
  offlineStatus: {
    waitconfirm: '待商家确认',
    success: '已完成',
    cancel: '已取消'
  },
  linkType: {
    0: '没链接',
    1: '链接小程序'
  },
  linkPos: {
    1: '首页',
    2: '师傅页',
    3: '商家页'
  },
  recordStatus: { // 商家状态
    1: '正常',
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
  pointsIncomeType: {
    1: '平台佣金抵扣',
    2: '商家提现',
  },
  pointsExpendType: {
    1: '注册派发',
    2: '下级下单奖励'
  },
  roleType: {
    1: '总部管理员',
    2: '分部管理员',
    3: '开发测试账号'
  },
  ownerType: {
    1: '总店长',
    2: '副店长'
  },
  cashInStatus: {
    1: '申请中',
    2: '驳回',
    3: '取消',
    4: '通过'
  },
  settleStauts: {
    0: '未审核',
    1: '已结算',
    2: '审核通过',
    3: '驳回'
  },
  settlePercent: {
    1: '80%',
    2: '20%'
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
