import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/admin/userlist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

export function getDetails(params) {
  return request({
    url: '/admin/craftsmaninfo',
    method: 'get',
    params
  })
}

export function craftsmanexamine(data) {
  return request({
    url: '/admin/craftsmanexamine',
    method: 'post',
    data
  })
}

export function getFeedbackList(data) {
  return request({
    url: '/admin/feedbacklist',
    method: 'post',
    data
  })
}