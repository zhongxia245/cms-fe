import React, { Component } from 'react'
import { Feedback } from '@icedesign/base'
import SelectableTable from './components/SelectableTable'
import SimpleFormDialog from './components/SimpleFormDialog'
import { get, getById, del, update, add, getColumns } from './services'

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
      columns: []
    }
  }

  getTableColumns = () => {
    const { name } = this.props
    this.setState({ isLoading: true })
    getColumns(name).then(data => {
      this.setState({ columns: data.data, isLoading: false })
    })
  }

  getTableData = () => {
    const { name } = this.props
    this.setState({ isLoading: true })
    get(name, this.state.pageIndex).then(data => {
      this.setState({ dataSource: data.data.data, total: data.data.total, isLoading: false })
    })
  }

  delTableData = (id) => {
    const { name } = this.props
    del(name, id).then(result => {
      Feedback.toast.success(`删除记录${id}成功!`)
      this.getTableData()
    })
  }

  componentDidMount = () => {
    this.getTableData()
    this.getTableColumns()
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
    const { name } = this.props
    if (data.id) {
      update(name, data).then(result => {
        this.getTableData()
        Feedback.toast.success('更新成功!')
        this.handleToggleDialog(false)
      })
    } else {
      add(name, data).then(result => {
        this.getTableData()
        Feedback.toast.success('添加成功!')
        this.handleToggleDialog(false)
      })
    }
  }

  handleChangePage = (pageIndex) => {
    this.setState({ pageIndex: pageIndex }, () => {
      this.getTableData()
    })
  }

  render() {
    const { name } = this.props
    const { visible, dialogData, dataSource, total, isLoading, columns } = this.state
    return (
      <div className="XtTable-page">
        <SelectableTable
          key={`table_${name}`}
          dataSource={dataSource}
          total={total}
          isLoading={isLoading}
          config={columns}
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
