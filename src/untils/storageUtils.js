
import store from 'store'

export function saveUser(user) { //存值
  store.set('USER-KEY', user)
}

export function getUser() { //取值
  return store.get('USER-KEY') || {}
}

//删除保存的user
export function removeuser() {
  store.remove('user')
}