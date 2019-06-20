
// 1. 登陆
/*
export function reqLogin(username, password) {
  return ajax(BASE + '/login', {username, password}, 'POST')
}
*/

import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'
const BASE = ''
// 1. 登陆
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')


// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')


// 获取分类列表(一级/二级)
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })

// 更新分类的名称
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

//添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST')

//获取商品分页列表
export const reqProducts = ({ pageNum, pageSize }) => ajax(BASE + '/manage/product/list', { pageNum, pageSize })

//根据商品名称/描述 搜索商品分类列表
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType, //搜索类型 值为produceDesc/produceName
  searchName //搜索关键字
}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName

})

//对商品进行上架/下架处理
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')


//根据商品分类ID获取分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId })




/* function fn(params) {
  console.log('aa')
  console.log('aa')
  console.log('aa')

}
 */



/* reqLogin('admin', 'admin').then(result => { console.log('result', result) }) 测试代码*/
/* 
发jsonp请求获取当前天气信息
*/
export const reqWeather = (location) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      jsonp(url, {}, (error, data) => {

        if (!error && data.status === 'success') {
          const { dayPictureUrl, weather } = data.results[0].weather_data[0]
          resolve({ dayPictureUrl, weather })
        } else {
          message.error('天气获取失败')
        }

      })
    }, 2000)





  })

}