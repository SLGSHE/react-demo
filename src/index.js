import React from 'react'
import ReactDOM from 'react-dom'



import memeoryUtils from './untils/memeoryUtils'
import { getUser } from "../src/untils/storageUtils";
import App from './App'
import './api'

//const user = JSON.parse(localStorage.getItem('USER-KEY') || '{}')
const user = getUser()
memeoryUtils.user = user
ReactDOM.render(< App />, document.getElementById('root'))
