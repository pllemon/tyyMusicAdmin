import request from '@/utils/request'

export function getAccountList(data) {
  return request({
    url: `/admin/adminlist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

export function getDetails(params) {
  return request({
    url: '/admin/adminuserinfo',
    method: 'get',
    params
  })
}

export function updateRecord(data) {
  let url = '/admin/addadminuser'
  if (data.id) {
    url = '/admin/saveadminuser'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: '/admin/saveadminstatus',
    method: 'post',
    data
  })
}