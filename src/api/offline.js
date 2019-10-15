import request from '@/utils/request'

// 订单列表
export function getList(data) {
  return request({
    url: `/admin/businessorderlist?page=${data.page}&limit=${data.limit}`,
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
