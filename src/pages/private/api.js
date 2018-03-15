import Axios from 'axios'
import { BASE_URL } from '../../config'

const axiosInstance = Axios.create()

// axiosInstance.interceptors.response.use(resp => {
//   if (resp.data.r) {
//     return resp.data.data
//   } else {
//     if (resp.data.data) {
//       Toast.info(resp.data.data)
//     }
//   }
// })

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

export const get = (tableName, pageIndex, filter) => {
  return axiosInstance.get(`${URLS.get}${tableName}/${pageIndex}`, { params: filter })
}

export const getById = (tableName, id) => {
  return axiosInstance.get(`${URLS.getById}${tableName}/${id}`)
}

export const del = (tableName, id) => {
  return axiosInstance.delete(`${URLS.del}${tableName}/${id}`)
}

export const update = (tableName, user) => {
  return axiosInstance.put(`${URLS.update}${tableName}`, user)
}

export const add = (tableName, user) => {
  return axiosInstance.post(`${URLS.add}${tableName}`, user)
}

// 添加表的逻辑 和常规增删改查不一样，因此单独定义
export const addTableConfig = (tableName, tableData) => {
  return axiosInstance.post(`${URLS.addTableConfig}${tableData.table_name}`)
}

export const delTableConfig = (tableName, id) => {
  return axiosInstance.delete(`${URLS.delTableConfig}${id}`)
}

export const getColumns = (tableId) => {
  return axiosInstance.get(`${URLS.getColumnsById}${tableId}`)
}

export const getTableById = (tableId) => {
  return axiosInstance.get(`${URLS.getTableById}${tableId}`)
}
