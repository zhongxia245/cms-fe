/* eslint react/no-string-refs:0 */
import React, { Component } from 'react'
import { Input, Button, Checkbox, Grid } from '@icedesign/base'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from '@icedesign/form-binder'
import IceIcon from '@icedesign/icon'
import './UserLogin.scss'

const { Row, Col } = Grid

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage = 'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png'

export default class UserLogin extends Component {
  static displayName = 'UserLogin'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      value: {
        username: undefined,
        password: undefined,
        checkbox: false
      }
    }
  }

  formChange = value => {
    this.setState({
      value
    })
  }

  handleSubmit = e => {
    const { onLogin } = this.props
    e && e.preventDefault()
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors)
        return
      }
      onLogin &&
        onLogin(values).then(resp => {
          let result = resp.data.data
          if (result) {
            localStorage.setItem('jwt_token', result.token)
            window.location.href = '#/'
          } else {
            localStorage.removeItem('jwt_token')
            let value = this.state.value
            value.password = ''
            this.setState({ value: value })
          }
        })
    })
  }

  onKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  }

  render() {
    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            欢迎使用 <br /> XT 通用后台系统
          </h2>
          <div style={styles.formContainer}>
            <h4 style={styles.formTitle}>登录</h4>
            <IceFormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
              <div style={styles.formItems}>
                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon type="person" size="small" style={styles.inputIcon} />
                    <IceFormBinder name="username" required message="必填">
                      <Input maxLength={20} placeholder="会员名/邮箱/手机号" onKeyDown={this.onKeyDown} />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="username" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon type="lock" size="small" style={styles.inputIcon} />
                    <IceFormBinder name="password">
                      <Input htmlType="password" placeholder="密码" onKeyDown={this.onKeyDown} />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="username" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceFormBinder name="checkbox">
                      <Checkbox style={styles.checkbox}>记住账号</Checkbox>
                    </IceFormBinder>
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Button type="primary" onClick={this.handleSubmit} style={styles.submitBtn}>
                    登 录
                  </Button>
                </Row>

                <Row className="tips" style={styles.tips}>
                  <a href="/" style={styles.link}>
                    立即注册
                  </a>
                  <span style={styles.line}>|</span>
                  <a href="/" style={styles.link}>
                    忘记密码
                  </a>
                </Row>
              </div>
            </IceFormBinderWrapper>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh'
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover'
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee'
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column'
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px'
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999'
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px'
  },
  checkbox: {
    marginLeft: '5px'
  },
  tips: {
    textAlign: 'center'
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px'
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px'
  }
}
