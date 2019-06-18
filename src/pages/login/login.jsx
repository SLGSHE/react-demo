import React from "react";
import { Button, Form, Input, Icon, message } from 'antd'
import { Redirect } from 'react-router-dom'

import { reqLogin } from '../../api/index'
import memeoryUtils from '../../untils/memeoryUtils'
import { saveUser } from '../../untils/storageUtils'
import logo from '../../assets/images/logo.png'
import './login.less'

class Login extends React.Component {
  handleSubmit = (event) => {
    //组件标签是组件的实例
    event.preventDefault()//禁止点击跳转
    this.props.form.validateFields(async (err, values) => {
      if (!err) { //验证成功
        //发送ajax请求
        const { username, password } = values
        const result = await reqLogin(username, password)// {status: 0, data: user对象} | {status: 1, msg: 'xxx'}
        if (result.status === 0) {//若登录成功
          const user = result.data //保存数据
          memeoryUtils.user = user  // 保存在内存中
          saveUser(user)   // 保存到localStorage文件中

          //跳转到admin中
          this.props.history.replace('./')

        } else {
          message.error(result.msg)
          console.log(message.error(result.msg))
        }
      }
    })


  }

  validator = (rule, value = '', callback) => {
    value = value.trim()
    if (!value) {
      callback('请输入用户名')
    } else if (value.length < 4) {
      callback('最少输入4位')
    } else if (value.length > 12) {
      callback('最多输入12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('请输入数字，字母或下划线')
    } else {
      callback()
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    //console.log(this.props.form)
    // console.log(getFieldDecorator, '-------')
    // 访问login界面, 如果已经登陆, 自动跳转到admin
    if (memeoryUtils.user._id) {
      return <Redirect to='/' />
    }

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username', {
                  initialValue: '', //初始值为空
                  rules: [
                    { required: true, whitespace: true, message: '请输入用户名' },//必须输入内容
                    { min: 4, message: '最少输入4位' },//最小长度限制
                    { max: 12, message: '最多输入12位' }, //最大长度限制
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '请输入数字，字母或下划线' }
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }

            </Form.Item>
            <Form.Item>

              {
                getFieldDecorator('password', {
                  rules: [
                    { validator: this.validator }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />)
              }

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" >
                登 录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WrappedLogin = Form.create()(Login)
export default WrappedLogin