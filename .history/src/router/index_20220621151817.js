/*
 * @Author: '874847151@qq.com' '874847151@qq.com'
 * @Date: 2022-06-21 10:00:25
 * @LastEditors: '874847151@qq.com' '874847151@qq.com'
 * @LastEditTime: 2022-06-21 15:16:53
 * @FilePath: \hmmm\src\router\index.js
 * @Description:
 * WX:a874847151
 * TEL:15506967029
 * Copyright (c) 2022 by '874847151@qq.com' '874847151@qq.com', All Rights Reserved.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
