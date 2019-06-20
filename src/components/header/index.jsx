import React, { Component } from 'react'
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom'


import './index.less'
import { removeuser } from '../../untils/storageUtils'
import memeoryUtils from '../../untils/memeoryUtils'
import { formateDate } from '../../untils/dateUtils'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import LinkButton from '../link-button'





class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
    dayPictureUrl: '', //天气图片url
    weather: '' //天气文本

  }


  //获取当前组件的title,添加到header中
  getTitle = () => {
    //获得当前的路径
    const path = this.props.location.pathname
    let title = ''
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(item => path.indexOf(item.key) === 0)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  /* 
    console.log(a.b) //变量查找的作用域链，属性查找的原型链
    先查找a 查找一个变量，沿着作用域找，现在当前作用域找，再向外作用域找
    没找到；抛出异常，显示a没定义，a is not defined
    找到了  得到了那个值
          基本类型的值
            undefined/null
            number值/string值/boolean值
          地址值 存的是个地址值，是应用类型的 例子 var a = {}
      接着.b
        undefined/null  抛出异常 ：类型错误 cannot read property 'xxx' of null
        number值/string值 /boolean值：自动创建对应的包装类型对象,查找对象上的b属性
        地址值：找到堆空间中对应的对象，查找对象上的b属性
              属性查找
              查找b属性
                //现在对象自身上找，如果不存在，去原型链上依此查找
                  找不到，返回undefined //


                  a = {}
                  a.b = undefined
                  a.c =a.b //都是undefined



        var a = 2
        a.xxx //new Number(a).xxx

  */


  //获取时间
  showCurrentTime = () => {
    //每隔一秒获取时间
    this.itervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime }) //更新到状态中
    }, 1000)

  }

  //天气
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({
      dayPictureUrl, weather
    })


  }


  //点击退出账号
  logout = () => {
    Modal.confirm({
      title: '确认退出吗',
      onOk: () => {
        console.log(this);
        //确认退出，清除保存的user
        removeuser() //清除local中的
        memeoryUtils.user = {} //内存中的

        //跳转到登录界面
        //this.props.history.replace('/login')
        this.props.history.replace('/login')


      },
      onCancel() {

      }
    })
  }


  //在组件销毁之前，清除定时器
  componentWillUnmount() {
    clearInterval(this.itervalId)
  }

  componentDidMount() {
    //每隔1s更新时间的显示
    this.showCurrentTime()
    //更新天气
    this.getWeather()
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    //获得当前登录的用户名
    const { user } = memeoryUtils
    const title = this.getTitle()

    return (
      <div className="header">
        <div className='header-top'>
          <span>欢迎 {user.username}</span>
          {/* <a href="javascript:" onClick={this.logout}>退出</a> */}
          <LinkButton onClick={this.logout}>登出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            {!!dayPictureUrl && <img src={dayPictureUrl} alt="weather" />}
            <span>{weather}</span>
          </div>
        </div>
      </div>)
  }
}
export default withRouter(Header)