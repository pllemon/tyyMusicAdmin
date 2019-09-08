import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/orderlist',
    method: 'post',
    data
  })
}

export function getDetails(data) {
  return request({
    url: '/admin/orderinfo',
    method: 'post',
    data
  })
}

export function orderexamine(data) {
  return request({
    url: '/admin/orderexamine',
    method: 'post',
    data
  })
}