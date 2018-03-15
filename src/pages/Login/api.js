import Axios from 'axios'
import { BASE_URL } from '../../config'
import { Feedback } from "@icedesign/base";
const axiosInstance = Axios.create()

axiosInstance.interceptors.response.use(resp => {
  if (resp.data.code === 0) {
    return resp.data.data
  } else {
    Feedback.toast.error(resp.data.data)
  }
})

let URLS = {
  login: '/api/login',
}

for (const key in URLS) {
  if (URLS.hasOwnProperty(key)) {
    URLS[key] = `${BASE_URL}${URLS[key]}`;
  }
}

export const login = (userInfo) => {
  return axiosInstance.post(URLS.login, userInfo)
}
