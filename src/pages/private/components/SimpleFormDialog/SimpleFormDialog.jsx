import React, { Component } from 'react'
import { Dialog, Grid, Button, Feedback } from '@icedesign/base'


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

  render() {
    return (
      <Dialog
        className="simple-form-dialog"
        style={styles.simpleFormDialog}
        autoFocus={false}
        footerAlign="center"
        align="cc tc"
        title={`数据编辑`}
        {...this.props}
        onOk={this.props.onSubmit}
        onCancel={this.hideDialog}
        onClose={this.hideDialog}
        isFullScreen
        visible={this.state.visible}
      >
      </Dialog>
    )
  }
}

const styles = {
  simpleFormDialog: { width: '70%' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  alignRight: { textAlign: 'right' },
}
