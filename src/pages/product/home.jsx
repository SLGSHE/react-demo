import React, { Component } from 'react'
import { Card, Select, Icon, Button, Input, Table, message } from "antd";

import LinkButton from '../../components/link-button'

import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../untils/constants'

const { Option } = Select

//商品首页子路由组件
export default class ProductHome extends Component {
  state = {
    loading: false, //是否显示请求中的loading界面
    products: [ //当前页的商品数组

    ],
    total: 0,// 所有商品的总个数
    searchType: 'productName', //根据什么来搜索，productName ：商品名 productDesc:商品描述
    searchName: '',//搜索关键字
  }

  /* 组件包含输入框，数据收集数据的方式，决定是受控还是非受控组件
   受控组件：输入过程中，实时收集数据，自动放到状态中
   非受控组件：输入过程中，不收集数据，点提交或登录时，再去手动去取
  
  */

  /* 更新商品的状态 */
  UpdateStatus = async (status, productId) => {
    //console.log(productId, status)
    const result = await reqUpdateStatus(productId, status)
    //console.log(productId, status,'-----')
    if (result.status === 0) {
      message.success('更新状态成功')

      this.getProducts(this.pageNum)

    }
  }
  /* 初始化 table 的所有列信息的数组*/
  initColumns = () => {
    this.columns = [

      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price
      },
      {
        title: '状态',
        //dataIndex: 'status',
        width: 100,
        render: (product) => {
          const { status, _id } = product
          const btnText = status === 1 ? '下架' : '上架'
          const text = status === 1 ? '在售' : '已下架'
          return (
            <span>
              < Button type='primary' onClick={() => this.UpdateStatus(status === 1 ? 2 : 1, _id)}> {btnText}</Button >
              <span>{text}</span>
            </span >
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product) => (
          <span>
            <LinkButton onClick={() => this.props.history.push('/product/detail/' + product._id, product)}>详情</LinkButton>
            <LinkButton>修改</LinkButton>{/* + product._id, product */}
          </span>
        )
      },
    ]
  }

  //获取指定页码的商品列表数据
  getProducts = async (pageNum) => {
    // // 保存当前请求的页码
    this.pageNum = pageNum
    this.setState({ loading: true })//发送请求前显示loading图
    const { searchType, searchName } = this.state
    let result
    if (!searchName) {//searchName没有值 一般的分页请求
      result = await reqProducts({ pageNum, pageSize: PAGE_SIZE })

    } else {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName })
    }

    this.setState({ loading: false }) //发送请求之后关闭loading图

    if (result.status === 0) { //请求成功
      const { total, list } = result.data
      //更新状态
      this.setState({
        total,
        products: list

      })

    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getProducts(1)
  }


  render() {
    const { loading, products, total, searchType, searchName } = this.state
    const title = (
      <span>
        <Select style={{ width: '130px' }}
          value={searchType}
          onChange={
            value => this.setState({ searchType: value })
          }
        >
          <Option value="productName">按商品名称搜索</Option>
          <Option value="productDesc">按商品描述搜索</Option>
        </Select>
        <Input
          style={{ width: 150, margin: '0 15px' }}
          placeholder='关键字'
          value={searchName}
          onChange={
            event => this.setState({ searchName: event.target.value })
          }
        >
        </Input>
        <Button type='primary' onClick={() => this.getProducts(1)} > 搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/addUpdate')}> {/* 点击跳转到添加商品界面 */}
        <Icon type='plus' /> 
        添加商品
     </Button>
    )


    return (
      <div>
        <Card title={title} extra={extra} >
          <Table
            bordered//有边框
            rowKey="_id"  //表格行 key 的取值
            loading={loading} //加载图
            columns={this.columns} //列信息
            dataSource={products} //数据数组
            pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true, total, onChange: this.getProducts }}
          /* pagination分页器 defaultPageSize默认的每页条数 showQuickJumper快速跳转某页 total数据总数 */
          />
        </Card>
      </div >
    )
  }
}
