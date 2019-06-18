import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import menuList from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/images/logo.png'

const { SubMenu, Item } = Menu;

/* 
adin的左侧导航组件
*/
class LeftNav extends Component {

  //根据menu中数据中数组生成包含<Item> / <SubMenu>的数组 使用数组的map方法
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if (!item.children) { //没有children 为单项(Item)
        return (
          <Item key={item.key}>
            <Link to={item.key} />
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}

          </SubMenu>
        )
      }

    })
  }
  //根据menu中数据中数组生成包含<Item> / <SubMenu>的数组 使用数组的reduce方法
  getMenuNodes2 = (menuList) => {
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {
        // 如果请求的是当前item的children中某个item对应的path, 当前item的key就是openKey
        const cItem = item.children.find((cItem, index) => cItem.key === path)
        if (cItem) {// 当前请求的是某个二级菜单路由
          this.openkey = item.key
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes2(item.children)}
          </SubMenu>
        )
      }
      return pre
    }, [])


  }


  render() {
    const menuNodes = this.getMenuNodes2(menuList)
    const selectedKeys = this.props.location.pathname
    const openkey = this.openkey
    return (
      <div className="LeftNav">
        <Link to='/home' className='left-nav-header'>
          <img src={logo} alt="logo" />
          <h1>后台管理</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKeys]}
          defaultOpenKeys={[openkey]}
        >

          {
            menuNodes
          }








          {/*  <Item key="/home">
            <Link to='/home' />
            <Icon type="home" />
            <span>首页</span>
          </Item>
          <SubMenu
            key="/products"
            title={
              <span>
                <Icon type="appstore" />
                <span>商品</span>
              </span>
            }
          >
            <Item key="/category">
              <Link to='/category' />
              <Icon type="home" />
              <span>品类管理</span>
            </Item>
            <Item key="/product">
              <Link to='/product' />
              <Icon type="home" />
              <span>商品管理</span>
            </Item>

          </SubMenu> */}

        </Menu>
      </div>
    )
  }
}


//使用weithRouter包装LeftNav 产生新的路由组件，使之有 histor/location /match
export default withRouter(LeftNav)