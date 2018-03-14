import { BASE_URL } from '../../../config'
let URLS = {
  getById: '/api/curd/',                                    // /api/curd/:tableName:id   get 请求
  get: '/api/curd/select/',                                 // /api/curd/select/:tableName/:pageIndex  get 请求
  del: '/api/curd/',                                        // /api/curd/:tableName    delete 提交
  update: '/api/curd/',                                     // /api/curd/:tableName    put 提交
  add: '/api/curd/',
  getTableById: '/api/tableconfig/',                                         // /api/curd/:tableName    post 提交
  addTableConfig: '/api/tableconfig/',                      // 添加一个表
  delTableConfig: '/api/tableconfig/',                 // 删除一个表配置，级联删除tablefieldconfig数据
  getColumnsById: '/api/tablefieldconfig/',                 // 获取表字段
}

for (const key in URLS) {
  if (URLS.hasOwnProperty(key)) {
    URLS[key] = BASE_URL + URLS[key]
  }
}

export default URLS
