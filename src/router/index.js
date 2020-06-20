import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import("../views/login/index.vue")
const Home = () => import("../views/Home")
const Info = () => import("../views/info/Info")

const roleList = () => import("../views/rolelist/index.vue")
const rightList = () => import("../views/rightList/index.vue")
const GoodsList = () => import("../views/goodsList/index.vue")
const GoodsAdd = () => import("../views/goodsadd/index.vue")
const Report = () => import("../views/report/index.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      // 设置路由元数据
      Authorition: true
    },
    children: [
      {
        path: '',
        name: "Info",
        component: Info
      }, {
        path: '/rolelist',
        name: "roleList",
        component: roleList
      }, {
        path: '/rightlist',
        name: "rightList",
        component: rightList
      }, {
        path: '/goodsList',
        name: "GoodsList",
        component: GoodsList
      }, {
        path: '/goodsadd',
        name: "GoodsAdd",
        component: GoodsAdd
      }, {
        path: '/report',
        name: "Report",
        component: Report
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('to', to)

  if (to.path === '/login') {
    return next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      return next("/login")
    }
    next()
  }

})
export default router
