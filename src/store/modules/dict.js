const state = {
  config: {
    ip: 'http://47.106.100.144/'
  },
  changeType: ['查看', '添加', '编辑', '删除', '审核', '指派'],
  enableState: ['禁用', '启用'],
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
  linkType: {
    0: '没链接',
    1: '链接小程序',
    2: '外链'
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
