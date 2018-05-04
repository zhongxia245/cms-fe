import React, { Component } from 'react'
import IceContainer from '@icedesign/container'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from '@icedesign/form-binder'
import { Button, Select, Grid } from '@icedesign/base'
import { getDataBase, getTables, add, update } from '../../api'

const { Row, Col } = Grid

export default class ColumnForm extends Component {
  static displayName = 'ColumnForm'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      dbList: [{ label: '请选择数据库', value: '' }],
      tableList: [{ label: '无可选表', value: '' }],
      value: props.data || {
        database: '',
        table_name: ''
      }
    }
  }

  componentDidMount() {
    const { database } = this.state.value
    getDataBase().then(resp => {
      let dbs = resp.data.data
      let dbList = dbs.map(item => {
        return { label: item.database, value: item.database }
      })
      this.setState({ dbList: dbList })
    })
    // if exist database , get tables list
    if (database) {
      this.getTablesData(database)
    }
  }

  getTablesData = val => {
    getTables(val).then(resp => {
      let tables = resp.data
      let tableList = tables.map(item => {
        return { label: item.TABLE_NAME, value: item.TABLE_NAME }
      })
      this.setState({ tableList: tableList })
    })
  }

  onFormChange = value => {
    this.setState({ value })
  }

  onChangeDatabase = val => {
    this.getTablesData(val)
  }

  onSubmit = callback => {
    const { id } = this.props.data || {}
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value)
      if (error) {
        // 处理表单报错
      }
      callback(value)
    })
  }

  render() {
    const { tableList, dbList } = this.state
    return (
      <div className="column-form">
        <IceContainer style={styles.container}>
          <IceFormBinderWrapper
            ref={formRef => {
              this.formRef = formRef
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <Row wrap>
              <Col xxs="24" s="24" l="24">
                <Row style={styles.formItem}>
                  <Col xxs="8" s="6" l="6" style={styles.formLabel}>
                    数据库：
                  </Col>
                  <Col s="12" l="12">
                    <IceFormBinder name="database" required message="必须选择一个数据库">
                      <Select
                        className="next-form-text-align"
                        style={{ width: '100%' }}
                        dataSource={dbList}
                        onChange={this.onChangeDatabase}
                      />
                    </IceFormBinder>
                    <IceFormError name="database" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col xxs="8" s="6" l="6" style={styles.formLabel}>
                    表：
                  </Col>
                  <Col s="12" l="12">
                    <IceFormBinder name="table_name">
                      <Select className="next-form-text-align" style={{ width: '100%' }} dataSource={tableList} />
                    </IceFormBinder>
                  </Col>
                </Row>
              </Col>
            </Row>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  container: {
    paddingBottom: 0
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '30px'
  },
  formLabel: {
    textAlign: 'right'
  },
  btns: {
    margin: '25px 0'
  },
  resetBtn: {
    marginLeft: '20px'
  }
}
