import React, { Component } from 'react'
import { Feedback, Dialog } from '@icedesign/base'
import SelectableTable from '../SelectableTable'
import FormDialog from '../FormDialog'

const setNullToEmptyStr = data => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] === undefined || data[key] === null) {
        data[key] = ''
      } else {
        data[key] = data[key]
      }
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

  getTableData = filter => {
    const { name, get } = this.props
    this.setState({ isLoading: true })
    get(name, this.state.pageIndex, filter).then(data => {
      if (filter) {
        this.setState({
          dataSource: data.data.data,
          total: data.data.total,
          isLoading: false,
          pageIndex: 1,
          filter: filter
        })
      } else {
        this.setState({
          dataSource: data.data.data,
          total: data.data.total,
          isLoading: false,
          filter: {}
        })
      }
    })
  }

  delTableData = id => {
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

  handleSubmit = data => {
    let refForm = this.refs.refForm || this.refs.refCustomForm
    if (refForm) {
      refForm.onSubmit(data => {
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
    const { name, columns, filter, children } = this.props
    const { visible, dialogData, dataSource, total, isLoading } = this.state

    let newChildren = ''
    if (children) {
      newChildren = React.cloneElement(children, {
        ref: 'refCustomForm',
        onHide: this.handleToggleDialog.bind(this, false),
        data: dialogData
      })
    }

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

        <Dialog
          className="simple-form-dialog"
          style={styles.simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          align="cc tc"
          title={`数据编辑`}
          {...this.props}
          onOk={this.handleSubmit}
          onCancel={this.handleToggleDialog.bind(this, false)}
          onClose={this.handleToggleDialog.bind(this, false)}
          isFullScreen
          visible={this.state.visible}
        >
          {newChildren ? (
            newChildren
          ) : (
            <FormDialog ref="refForm" config={columns} data={dialogData} />
          )}
        </Dialog>
      </div>
    )
  }
}

const styles = {
  simpleFormDialog: { width: '70%' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  alignRight: { textAlign: 'right' }
}
