


import axios from 'axios'

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (method === 'GET') { //发送get请求
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    promise.then(
      response => { resolve(response.data) },
      error => { alert('请求出错 ' + error.message) }
    )

  })


}


/* async function login() {
  const result = await ajax('./login', {
    username: 'admin',
    password: 'admin'
  }, 'POST')

} */

