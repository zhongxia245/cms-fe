const BASE_URL = 'http://127.0.0.1:7001'
let URLS = {
  getById: '/api/curd/',            // /api/curd/:tableName:id   get 请求
  get: '/api/curd/select/',         // /api/curd/select/:tableName/:pageIndex  get 请求
  del: '/api/curd/',                // /api/curd/:tableName    delete 提交
  update: '/api/curd/',             // /api/curd/:tableName    put 提交
  add: '/api/curd/',                 // /api/curd/:tableName    post 提交
  getColumns: '/api/tableconfig/',                 // 获取表字段
}

for (const key in URLS) {
  if (URLS.hasOwnProperty(key)) {
    URLS[key] = BASE_URL + URLS[key]
  }
}

export default URLS
