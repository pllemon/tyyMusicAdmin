import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/admin/showlist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

export function getDetails(data) {
  return request({
    url: '/admin/showinfo',
    method: 'post',
    data
  })
}

export function updateRecord(data) {
  let url = '/admin/addshow'
  if (data.id) {
    url = '/admin/saveshow'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function updateRecordStatus(data) {
  return request({
    url: '/admin/saveshow',
    method: 'post',
    data
  })
}