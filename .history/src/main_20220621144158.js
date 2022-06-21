/*
 * @Author: '874847151@qq.com' '874847151@qq.com'
 * @Date: 2022-06-21 10:00:25
 * @LastEditors: '874847151@qq.com' '874847151@qq.com'
 * @LastEditTime: 2022-06-21 14:41:53
 * @FilePath: \hmmm\src\main.js
 * @Description:
 * WX:a874847151
 * TEL:15506967029
 * Copyright (c) 2022 by '874847151@qq.com' '874847151@qq.com', All Rights Reserved.
 */
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
