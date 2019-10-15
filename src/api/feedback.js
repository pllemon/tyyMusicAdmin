import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/admin/feedback?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}
