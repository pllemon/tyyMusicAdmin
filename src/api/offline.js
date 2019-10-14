import request from '@/utils/request'

// 订单列表
export function getList(data) {
  return request({
    url: `/admin/businessorderlist`,
    method: 'post',
    data
  })
}

// 订单详情
export function getDetails(data) {
  return request({
    url: '/admin/businessorderinfo',
    method: 'post',
    data
  })
}
