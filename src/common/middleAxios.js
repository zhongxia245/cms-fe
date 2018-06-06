import Axios from 'axios'
import { Dialog } from '@icedesign/base'

Axios.interceptors.response.use(
  resp => {
    if (resp.data.token) {
      console.log('token:', resp.data.token)
      window.localStorage.setItem('jwt_token', response.data.token)
    }
    return resp
  },
  error => {
    const errRes = error.response
    if (errRes.status === 401) {
      window.localStorage.removeItem('jwt_token')
      Dialog.confirm({
        title: '登录过期',
        content: '登录已过期，请重新登录',
        closable: true,
        onClose: () => {
          window.location.href = '#/login'
        },
        onOk: () => {
          window.location.href = '#/login'
        }
      })
    }
    return Promise.reject(error.message) // 返回接口返回的错误信息
  }
)

Axios.interceptors.request.use(request => {
  const token = window.localStorage.getItem('jwt_token')
  console.log(token)
  if (token) {
    request.headers['Authorization'] = `${token}`
  }
  return request
})
