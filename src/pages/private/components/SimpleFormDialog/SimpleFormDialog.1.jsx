import React, { Component } from 'react'
import { Dialog, Grid, Input, Button, Feedback } from '@icedesign/base'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder'

const { Row, Col } = Grid

export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog'

  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible || false,
      data: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible, data: nextProps.data })
    }
  }


  hideDialog = () => {
    this.setState({
      visible: false
    })
    this.props.onHide && this.props.onHide(false)
  }

  onOk = () => {
    const { tableName, updateData, addData, onSubmit } = this.props
    this.refForm.validateAll((error, data) => {
      if (error) {
        // show validate error
        return
      }
      // deal with value
      onSubmit && onSubmit(data)
      if (updateData && addData) {
        if (data.id) {
          updateData(tableName, data).then(result => {
            Feedback.toast.success('更新成功!')
            this.hideDialog()
          })
        } else {
          addData(tableName, data).then(result => {
            Feedback.toast.success('添加成功!')
            this.hideDialog()
          })
        }
      }
    })
  }

  onFormChange = (data) => {
    this.setState({ data })
  }

  renderRow = (item, index) => {
    if (!item.form_show) {
      return
    }
    return (
      <Row style={styles.formRow} key={index}>
        <Col span="6" style={styles.alignRight}>
          <label style={styles.formLabel}>{item.title || item.name}：</label>
        </Col>
        <Col span="16">
          <IceFormBinder {...item.rules}>
            <Input name={item.name} style={styles.input} disabled={!!item.form_disabled} placeholder={`请输入${item.title}`} />
          </IceFormBinder>
          <IceFormError name={item.name} />
        </Col>
      </Row>
    )
  }

  render() {
    const { config } = this.props
    return (
      <Dialog
        className="simple-form-dialog"
        style={styles.simpleFormDialog}
        autoFocus={false}
        footerAlign="center"
        title={`数据编辑`}
        {...this.props}
        onOk={this.onOk}
        onCancel={this.hideDialog}
        onClose={this.hideDialog}
        isFullScreen
        visible={this.state.visible}
      >
        <IceFormBinderWrapper
          ref={(ref) => {
            this.refForm = ref
          }}
          value={this.state.data}
          onChange={this.onFormChange}
        >
          <div style={styles.dialogContent}>
            {config && config.map((item, index) => {
              if (!item.edit_hide) {
                return this.renderRow(item, index)
              }
            })}
          </div>
        </IceFormBinderWrapper>
      </Dialog>
    )
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  alignRight: { textAlign: 'right' },
}
