
import store from 'store'

export function saveUser(user) { //存值
  store.set('USER-KEY', user)
}

export function getUser() { //取值
  return store.get('USER-KEY') || {}
}