import axios from 'axios'
import URLS from './urls'

export const get = (tableName, pageIndex, filter) => {
  return axios.get(`${URLS.get}${tableName}/${pageIndex}`, { params: filter })
}

export const getById = (tableName, id) => {
  return axios.get(`${URLS.getById}${tableName}/${id}`)
}

export const del = (tableName, id) => {
  return axios.delete(`${URLS.del}${tableName}/${id}`)
}

export const update = (tableName, user) => {
  return axios.put(`${URLS.update}${tableName}`, user)
}

export const add = (tableName, user) => {
  return axios.post(`${URLS.add}${tableName}`, user)
}

// 添加表的逻辑 和常规增删改查不一样，因此单独定义
export const addTableConfig = (tableName, tableData) => {
  return axios.post(`${URLS.addTableConfig}${tableData.table_name}`)
}

export const delTableConfig = (tableName, id) => {
  return axios.delete(`${URLS.delTableConfig}${id}`)
}

export const getColumns = (tableId) => {
  return axios.get(`${URLS.getColumnsById}${tableId}`)
}

export const getTableById = (tableId) => {
  return axios.get(`${URLS.getTableById}${tableId}`)
}
