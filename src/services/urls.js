const BASE_URL = 'http://127.0.0.1:7001'
let URLS = {
  getUserById: '/api/user/',            // 根据id获取用户信息
  getUsers: '/api/user/select/',         // 分页获取用户信息
  delUser: '/api/user/del/',
  updateUser: '/api/user/update',
  addUser: '/api/user/add'
}

for (const key in URLS) {
  if (URLS.hasOwnProperty(key)) {
    URLS[key] = BASE_URL + URLS[key]
  }
}

export default URLS
