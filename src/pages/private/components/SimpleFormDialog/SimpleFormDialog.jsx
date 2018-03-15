import React, { Component } from 'react'
import { Dialog, Grid, Button, Feedback } from '@icedesign/base'
import FormDialog from '../FormDialog'

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
    this.refs.refForm.onSubmit((data) => {
      onSubmit && onSubmit(data)
    })
  }

  render() {
    const { config, data } = this.props
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
        <FormDialog ref='refForm' config={config} data={data} />
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
