import React, { Component } from 'react';
import XtTable from '../../components/XtTable';
import { get, getById, del, update, add, getTableById, getColumns } from '../../api'

export default class Curd extends Component {
  static displayName = 'curd';
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      tableName: ''
    }
  }

  componentDidMount = () => {
    const { tableId } = this.props.params
    Promise.all([getColumns(tableId), getTableById(tableId)]).then(result => {
      this.setState({ columns: result[0]['data'], tableName: result[1]['data']['table_name'] })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.tableId !== this.props.params.tableId) {
      this.setState({ tableName: '' })
      Promise.all([getColumns(nextProps.params.tableId), getTableById(nextProps.params.tableId)]).then(result => {
        this.setState({ columns: result[0]['data'], tableName: result[1]['data']['table_name'] })
      })
    }
  }


  render() {
    const { tableId } = this.props.params
    const { columns, tableName } = this.state
    const api = { get, getById, del, update, add }
    // 这里的key不能少，否则react会缓存，不重新渲染
    return (
      <div className="curd-page" key={`${tableName}_${tableId}`}>
        {tableName ? <XtTable  {...api} name={tableName} columns={columns} /> : ''}
      </div>
    );
  }
}
