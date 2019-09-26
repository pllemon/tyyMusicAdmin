import request from '@/utils/request'

// 订单列表
export function getList(data) {
  return request({
    url: '/admin/orderlist',
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

// 发布订单
export function release(data){
  return request({
    url: '/admin/ordersrelease',
    method: 'post',
    data
  })
}