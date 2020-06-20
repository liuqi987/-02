import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from "axios"
Vue.prototype.$axios = axios
//  // 获取token值
//  const token = localStorage.getItem("token");
//  // // 配置请求头
//  this.$axios.defaults.headers["Authorization"] = token;

moment.locale('zh-cn')

//创建一个日期的全局过滤器
//Vue.filter('过滤器名',函数)
Vue.filter('date', function (t) {
  return moment(t).format("YYYY-MM-DD h:mm:ss a")
})

//引入全局面包屑组件
import Break from "@/components/break-com/index.vue";
import { result } from 'lodash'
Vue.component('Break', Break)

// 全局过滤器
Vue.filter('levelFn', function (num) {
  let result = ''
  switch (num) {
    case '0': result = "一级"; break;
    case '1': result = "二级"; break;
    case '2': result = "一级"; break;
    default: result = '没有级别'
  }
  return result
})
//全局路由守卫
// router.beforeEach((to, from, next) => {
//   console.log('to:', to)
//   const token = localStorage.getItem('token');
//   //some是数组的遍历方法，只要任意一个数组元素是true,就返回true
//   if (to.matched.some(item => item.meta.Authorition)) {
//     if (!token) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }  //记录我从哪个路由跳转到登录组件的
//       })
//     } else {
//       next()
//     }

//   } else {
//     next()
//   }
// })


Vue.config.productionTip = false

new Vue({
  router,
  store,
  moment,
  render: h => h(App)
}).$mount('#app')
