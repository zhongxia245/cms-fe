import axios from 'axios'
import URLS from './urls'

export const getUsers = (pageIndex, pageSize) => {
  return axios.get(`${URLS.getUsers}${pageIndex}`, { pageSize: pageSize })
}

export const getUserById = (id) => {
  return axios.get(`${URLS.getUserById}${id}`)
}

export const delUserById = (id) => {
  return axios.get(`${URLS.delUser}${id}`)
}

export const updateUser = (user) => {
  return axios.post(`${URLS.updateUser}`, user)
}

export const addUser = (user) => {
  return axios.post(`${URLS.addUser}`, user)
}
