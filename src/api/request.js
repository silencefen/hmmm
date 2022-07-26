import axios from 'axios'
// import router from '@/router/index.js'

const request = axios.create({
  baseUrl: process.env.VUE_APP_BASEURL,
  // 跨域携带cookie
  withCredentials: true
})

export default request
