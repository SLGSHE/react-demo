
// 1. 登陆
/*
export function reqLogin(username, password) {
  return ajax(BASE + '/login', {username, password}, 'POST')
}
*/

import ajax from './ajax'
const BASE = ''

export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')




reqLogin('admin', 'admin').then(result => { console.log('result', result) })