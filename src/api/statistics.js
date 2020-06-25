import request from '@/utils/request'

export function orderstatistics(data) {
  return request({
    url: '/admin/orderstatistics',
    method: 'post',
    data
  })
}

export function rolestatistics(data) {
  return request({
    url: '/admin/rolestatistics',
    method: 'post',
    data
  })
}

export function unlinkorderstatistics(data) {
  return request({
    url: '/admin/unlinkorderstatistics',
    method: 'post',
    data
  })
}