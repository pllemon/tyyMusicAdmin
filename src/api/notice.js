import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/admin/webmessagelist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

export function getDetails(params) {
  return request({
    url: '/admin/webmessageinfo',
    method: 'get',
    params
  })
}

export function updateRecord(data) {
  let url = '/admin/setwebmessage'
  if (data.id) {
    url = '/admin/setwebmessage'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}