<!--
 * @Author: '874847151@qq.com' '874847151@qq.com'
 * @Date: 2022-06-21 10:00:25
 * @LastEditors: '874847151@qq.com' '874847151@qq.com'
 * @LastEditTime: 2022-06-21 14:24:30
 * @FilePath: \hmmm\src\App.vue
 * @Description:
 * WX:a874847151
 * TEL:15506967029
 * Copyright (c) 2022 by '874847151@qq.com' '874847151@qq.com', All Rights Reserved.
-->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
