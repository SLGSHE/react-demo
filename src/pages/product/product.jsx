import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'


import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
import './product.less'

/**
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return ( /* /:id */
      <Switch> {/* exact: bool ,如果为 true，则只有在路径完全匹配 location.pathname 时才匹配。 */}
        <Route exact path='/product' component={ProductHome}></Route>
        <Route path='/product/detail/:id' component={ProductDetail}></Route>
        <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
        <Redirect to='/product'></Redirect>
      </Switch>
    )
  }
}
