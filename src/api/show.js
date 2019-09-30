import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/showlist',
    method: 'post',
    data
  })
}

export function getDetails(params) {
  return request({
    url: '/admin/showinfo',
    method: 'get',
    params
  })
}

export function updateRecord(data) {
  return request({
    url: '/admin/addshow',
    method: 'post',
    data
  })
}

export function uploadUrl() {
  return '/admin/uploadordershow'
}