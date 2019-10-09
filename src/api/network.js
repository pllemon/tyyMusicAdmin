import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/networklist',
    method: 'post',
    data
  })
}

export function getDetails(params) {
  return request({
    url: '/admin/networkinfo',
    method: 'get',
    params
  })
}

export function updateRecord(data) {
  let url = '/admin/addnetwork'
  if (data.id) {
    url = '/admin/updatenetwork'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}
