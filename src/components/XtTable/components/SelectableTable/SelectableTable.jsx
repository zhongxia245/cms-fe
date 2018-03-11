import React, { Component } from 'react'
import { Table, Button, Icon, Pagination, Feedback, Dialog } from '@icedesign/base'
import IceContainer from '@icedesign/container'

export default class SelectableTable extends Component {
  static displayName = 'SelectableTable'
  constructor(props) {
    super(props)

    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids) => {
        this.setState({
          selectedRowKeys: ids,
        })
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records)
      },
      // 支持针对特殊行进行定制
      getProps: (record) => {
        return {
          disabled: record.id === 100306660941,
        }
      },
    }

    this.state = {
      tableConfig: this.props.config || [],
      selectedRowKeys: [],
      pageIndex: props.pageIndex || 1,
      dataSource: props.dataSource || [],
      total: props.dataSource || 0,
    }
  }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    })
  }

  editOrAddItem = (record = {}) => {
    const { toggleDialog } = this.props
    toggleDialog(true, record)
    // this.setState({ visible: true, currentValue: record })
  }

  handleConfirmDel = (id) => {
    const { onDel } = this.props
    Dialog.confirm({
      title: '温馨提示',
      content: `确定删除id=${id}的数据?`,
      locale: {
        ok: "确认",
        cancel: "取消"
      },
      onOk: () => {
        onDel && onDel(id)
      }
    })
  }

  deleteItem = (record) => {
    const { id } = record
    this.handleConfirmDel(id)
  }

  deleteSelectedKeys = () => {
    const { selectedRowKeys } = this.state
    let ids = selectedRowKeys.join(',')
    this.handleConfirmDel(ids)
  }

  renderOperator = (value, index, record) => {
    return (
      <div style={styles.fontColor}>
        <a style={styles.editBtn} onClick={this.editOrAddItem.bind(this, record)}>编辑</a>
        <a style={styles.removeBtn} onClick={this.deleteItem.bind(this, record)}>删除</a>
      </div>
    )
  }

  render() {
    const { config, onPageChange, total, dataSource, isLoading } = this.props
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        {/*表格相关 START*/}
        <IceContainer style={styles.IceContainer}>
          <div>
            <Button size="small" style={styles.batchBtn} onClick={this.editOrAddItem.bind(this, {})}>
              <Icon type="add" />增加
            </Button>
            <Button onClick={this.deleteSelectedKeys} size="small" style={styles.batchBtn} disabled={!this.state.selectedRowKeys.length}>
              <Icon type="ashbin" />删除
            </Button>
            <Button onClick={this.clearSelectedKeys} size="small" style={styles.batchBtn}>
              <Icon type="close" />清空选中
            </Button>
          </div>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={dataSource}
            isLoading={isLoading}
            rowSelection={{
              ...this.rowSelection,
              selectedRowKeys: this.state.selectedRowKeys,
            }}
          >
            {config.map((item, index) => {
              return (
                <Table.Column
                  key={index}
                  align={item.align || 'center'}
                  title={item.title}
                  dataIndex={item.name}
                  lock={item.lock}
                  width={item.width} />
              )
            })}
            <Table.Column title="操作" cell={this.renderOperator} lock="right" width={120}
            />
          </Table>
          {/*表格分页相关 START*/}
          <div style={styles.pagination}>
            <Pagination total={total} onChange={onPageChange} />
          </div>
        </IceContainer>

        {/*弹窗相关 START*/}
      </div>
    )
  }
}

const styles = {
  batchBtn: {
    marginRight: '10px',
  },
  IceContainer: {
    marginBottom: '20px',
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  removeBtn: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
  editBtn: {
    cursor: 'pointer',
  },
  fontColor: {
    color: '#2A64E8'
  }
}
