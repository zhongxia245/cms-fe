import React, { Component } from 'react';
import XtTable from '../../components/XtTable';

// const TABLE_CONFIG = [
//   { name: 'id', title: '编码', required: true, comp_id: 1, isLock: true, align: 'center', width: 60 },
//   { name: 'username', title: '名称', required: true, comp_id: 1, align: 'center', width: 150 },
//   { name: 'phone', title: '手机号', required: true, comp_id: 1, align: 'center', width: 150 },
//   { name: 'email', title: '邮箱', required: true, comp_id: 1, align: 'center', width: 150 },
//   { name: 'disabled', title: '状态', required: true, comp_id: 1, align: 'center', width: 60 },
//   { name: 'remark', title: '备注', required: true, comp_id: 1, align: 'center', width: 200 },
//   { name: 'create_time', title: '创建时间', required: true, comp_id: 1, align: 'center', width: 200 },
// ]

// const TABLE_CONFIG = [
//   { name: 'id', title: '编码', required: true, comp_id: 1, isLock: true, align: 'center', width: 60, hide: true },
//   { name: 'start_time', title: '开始时间', required: true, comp_id: 1, align: 'center', width: 200 },
//   { name: 'end_time', title: '结束时间', required: true, comp_id: 1, align: 'center', width: 200 },
//   { name: 'duration', title: '时长', required: true, comp_id: 1, align: 'center', width: 150 },
//   { name: 'year', title: '年', required: true, comp_id: 1, align: 'center', width: 60, hide: true },
//   { name: 'month', title: '月', required: true, comp_id: 1, align: 'center', width: 60, hide: true },
//   { name: 'remark', title: '备注', required: true, comp_id: 1, align: 'center', width: 150 },
// ]

export default class Curd extends Component {
  static displayName = 'curd';
  render() {
    const { tableName } = this.props.params
    // 这里的key不能少，否则react会缓存，不重新渲染
    return (
      <div className="curd-page" key={tableName}>
        <XtTable name={tableName} />
      </div>
    );
  }
}
