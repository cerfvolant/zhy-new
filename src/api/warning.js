import request from '@/utils/request'

export function getWarning() {
  return request({
    url: '/warning/info',
    method: 'get'
  })
}
