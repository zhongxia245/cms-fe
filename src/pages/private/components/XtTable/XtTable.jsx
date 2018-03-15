import React, { Component } from 'react'
import { Feedback } from '@icedesign/base'
import SelectableTable from '../SelectableTable'
import SimpleFormDialog from '../SimpleFormDialog'

const setNullToEmptyStr = (data) => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      data[key] = data[key] || ''
    }
  }
  return data
}

export default class XtTable extends Component {
  static displayName = 'XtTable'

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      dialogData: {},
      pageIndex: 1,
      filter: {}
    }
  }

  getTableData = (filter) => {
    const { name, get } = this.props
    this.setState({ isLoading: true })
    get(name, this.state.pageIndex, filter).then(data => {
      if (filter) {
        this.setState({ dataSource: data.data.data, total: data.data.total, isLoading: false, pageIndex: 1, filter: filter })
      } else {
        this.setState({ dataSource: data.data.data, total: data.data.total, isLoading: false, filter: {} })
      }
    })
  }

  delTableData = (id) => {
    const { name, del } = this.props
    del(name, id).then(result => {
      Feedback.toast.success(`删除记录${id}成功!`)
      this.getTableData()
    })
  }

  componentDidMount = () => {
    this.getTableData()
  }

  handleToggleDialog = (flag, record) => {
    let dialogData = {}
    if (flag) {
      dialogData = record
    }
    dialogData = setNullToEmptyStr(dialogData)
    this.setState({ visible: flag, dialogData: dialogData })
  }

  handleSubmit = (data) => {
    const { filter } = this.state
    const { name, update, add } = this.props
    if (data.id) {
      update(name, data).then(result => {
        this.getTableData(filter)
        Feedback.toast.success('更新成功!')
        this.handleToggleDialog(false)
      })
    } else {
      add(name, data).then(result => {
        this.getTableData(filter)
        Feedback.toast.success('添加成功!')
        this.handleToggleDialog(false)
      })
    }
  }

  handleChangePage = (pageIndex, pageSize) => {
    let { filter } = this.state
    if (typeof pageSize === 'number') {
      filter = filter || {}
      filter.pageSize = pageSize
    }
    this.setState({ pageIndex: pageIndex }, () => {
      this.getTableData(filter)
    })
  }

  render() {
    const { name, columns, filter } = this.props
    const { visible, dialogData, dataSource, total, isLoading } = this.state
    return (
      <div className="XtTable-page">
        <SelectableTable
          key={`table_${name}`}
          dataSource={dataSource}
          total={total}
          isLoading={isLoading}
          config={columns}
          filter={filter}
          getData={this.getTableData}
          toggleDialog={this.handleToggleDialog}
          onPageChange={this.handleChangePage}
          onDel={this.delTableData}
        />
        <SimpleFormDialog
          key={`dialog_${name}`}
          config={columns}
          visible={visible}
          data={dialogData}
          onSubmit={this.handleSubmit}
          onHide={this.handleToggleDialog}
        />
      </div>
    )
  }
}
