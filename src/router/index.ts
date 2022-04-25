import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { getCookie } from "@/util/cookie"
import { infoList } from "./Info/index"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "Index" */ "@/views/Index.vue"),
    redirect: "OrderList",
    children: [...infoList],
  },
  {
    path: "/Login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login/Index.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && getCookie("isLogin") !== "true") {
    next({ name: "Login" })
  } else {
    next()
  }
})
export default router
