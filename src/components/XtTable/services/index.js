import axios from 'axios'
import URLS from './urls'

export const get = (tableName, pageIndex, pageSize) => {
  return axios.get(`${URLS.get}${tableName}/${pageIndex}`, { pageSize: pageSize })
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

export const getColumns = (tableName) => {
  console.log(`${URLS.getColumns}${tableName}`);
  return axios.get(`${URLS.getColumns}${tableName}`)
}
