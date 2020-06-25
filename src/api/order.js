import request from '@/utils/request'

// 订单列表
export function getList(data) {
  return request({
    url: `/admin/orderlist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

// 订单详情
export function getDetails(data) {
  return request({
    url: '/admin/orderinfo',
    method: 'post',
    data
  })
}

// 订单审核
export function orderexamine(data) {
  return request({
    url: '/admin/orderexamine',
    method: 'post',
    data
  })
}

// 订单审核2
export function orderexamine2(data) {
  return request({
    url: '/admin/ordertonetwork',
    method: 'post',
    data
  })
}

// 发布订单
export function release(data){
  return request({
    url: '/admin/ordersrelease',
    method: 'post',
    data
  })
}

// 获取订单报名列表
export function ordercraftsmanlist(data){
  return request({
    url: '/admin/ordercraftsmanlist',
    method: 'post',
    data
  })
}

// 选择某个师傅
export function choosecraftsman(data){
  return request({
    url: '/admin/choosecraftsman',
    method: 'post',
    data
  })
}