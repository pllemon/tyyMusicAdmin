import request from '@/utils/request'

export function getNetworkList(data) {
  return request({
    url: `/admin/networklist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

export function getDetails(data) {
  return request({
    url: '/admin/networkinfo',
    method: 'post',
    data
  })
}

export function updateRecord(data) {
  let url = '/admin/addnetwork'
  if (data.network_id) {
    url = '/admin/updatenetwork'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}
