import React, { Component } from 'react'
import XtTable from '../../components/XtTable'
import { get, getById, del, update, add, getColumns } from '../../api'

const COLUMNS_CONFIG = [
  {
    table_name: 'c_navconfig',
    name: 'id',
    fieldname: 'id',
    title: 'id',
    col_show: 1,
    col_width: null,
    col_lock: 'false',
    col_unit: null,
    col_sort: 0,
    col_sortable: null,
    col_align: 'center',
    form_show: 0,
    form_type: 'input',
    form_disabled: 0,
    form_sort: 0,
    form_format: null,
    form_required: 0,
    form_validate_msg: null,
    form_rules: null,
    remark: ''
  },
  {
    table_name: 'c_navconfig',
    name: 'parent_id',
    fieldname: 'parent_id',
    title: '父节点',
    col_show: 1,
    col_width: null,
    col_lock: 'false',
    col_unit: null,
    col_sort: 1,
    col_sortable: null,
    col_align: 'center',
    form_show: 1,
    form_type: 'input',
    form_disabled: 0,
    form_sort: 1,
    form_format: null,
    form_required: 0,
    form_validate_msg: null,
    form_rules: null,
    remark: '父节点'
  },
  {
    table_name: 'c_navconfig',
    name: 'text',
    fieldname: 'text',
    title: '菜单名称',
    col_show: 1,
    col_width: null,
    col_lock: 'false',
    col_unit: null,
    col_sort: 3,
    col_sortable: null,
    col_align: 'center',
    form_show: 1,
    form_type: 'input',
    form_disabled: 0,
    form_sort: 3,
    form_format: null,
    form_required: 0,
    form_validate_msg: null,
    form_rules: null,
    remark: '菜单名称'
  },
  {
    table_name: 'c_navconfig',
    name: 'path',
    fieldname: 'path',
    title: '路径',
    col_show: 1,
    col_width: null,
    col_lock: 'false',
    col_unit: null,
    col_sort: 4,
    col_sortable: null,
    col_align: 'center',
    form_show: 1,
    form_type: 'input',
    form_disabled: 0,
    form_sort: 3,
    form_required: 0,
    form_validate_msg: null,
    form_rules: null,
    remark: '路径'
  },
  {
    table_name: 'c_navconfig',
    name: 'icon',
    fieldname: 'icon',
    title: '图标',
    col_show: 1,
    col_width: null,
    col_lock: 'false',
    col_unit: null,
    col_sort: 5,
    col_sortable: null,
    col_align: 'center',
    form_show: 1,
    form_type: 'input',
    form_disabled: 0,
    form_sort: 5,
    form_format: null,
    form_required: 0,
    form_validate_msg: null,
    form_rules: null,
    remark: '图标'
  },
  {
    table_name: 'c_navconfig',
    name: 'disabled',
    fieldname: 'disabled',
    title: '禁用',
    col_show: 1,
    col_width: null,
    col_lock: 'false',
    col_unit: null,
    col_sort: 6,
    col_sortable: null,
    col_align: 'center',
    form_show: 1,
    form_type: 'switch',
    form_disabled: 0,
    form_sort: 6,
    form_format: null,
    form_required: 0,
    form_validate_msg: null,
    form_rules: null,
    remark: '禁用'
  },
  {
    table_name: 'c_navconfig',
    name: 'create_time',
    fieldname: 'create_time',
    title: '创建时间',
    col_show: 1,
    col_width: null,
    col_lock: 'false',
    col_unit: null,
    col_sort: 8,
    col_sortable: null,
    col_align: 'center',
    form_show: 0,
    form_type: 'input',
    form_disabled: 0,
    form_sort: 8,
    form_format: null,
    form_required: 0,
    form_validate_msg: null,
    form_rules: null,
    remark: '创建时间'
  },
  {
    table_name: 'c_navconfig',
    name: 'remark',
    fieldname: 'remark',
    title: '备注',
    col_show: 1,
    col_width: null,
    col_lock: 'false',
    col_unit: null,
    col_sort: 9,
    col_sortable: null,
    col_align: 'center',
    form_show: 1,
    form_type: 'input',
    form_disabled: 0,
    form_sort: 9,
    form_format: null,
    form_required: 0,
    form_validate_msg: null,
    form_rules: null,
    remark: '备注'
  }
]

const FILTER = [{ text: 'id', value: 'id' }, { text: '角色', value: 'role_id' }, { text: '路径', value: 'path' }]

export default class NavConfigTable extends Component {
  static displayName = 'NavConfigTable'
  render() {
    const TABLE_NAME = 'c_navconfig'
    const api = { get, getById, del, update, add, getColumns }
    // 这里的key不能少，否则react会缓存，不重新渲染
    return (
      <div className="table-page" key={TABLE_NAME}>
        <XtTable {...api} name={TABLE_NAME} columns={COLUMNS_CONFIG} filter={FILTER} />
      </div>
    )
  }
}
