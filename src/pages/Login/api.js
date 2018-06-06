import Axios from 'axios'
import { BASE_URL } from '../../config'
import { Feedback } from '@icedesign/base'

let URLS = {
  login: '/api/login'
}

for (const key in URLS) {
  if (URLS.hasOwnProperty(key)) {
    URLS[key] = `${BASE_URL}${URLS[key]}`
  }
}

export const login = userInfo => {
  return Axios.post(URLS.login, userInfo)
}
