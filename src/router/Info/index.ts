import { RouteRecordRaw } from "vue-router"
export const infoList: Array<RouteRecordRaw> = [
  {
    path: "OrderList",
    name: "OrderList",
    component: () =>
      import(/* webpackChunkName: "Hello" */ "@/views/OrderList/Index.vue"),
  },  {
    path: "User",
    name: "User",
    component: () =>
      import(/* webpackChunkName: "Hello" */ "@/views/User/Index.vue"),
  },  {
    path: "Deliverer",
    name: "Deliverer",
    component: () =>
      import(/* webpackChunkName: "Hello" */ "@/views/Deliverer/Index.vue"),
  },  {
    path: "Cabinet",
    name: "Cabinet",
    component: () =>
      import(/* webpackChunkName: "Hello" */ "@/views/Cabinet/Index.vue"),
  },
  {
    path: "ShippingInformation",
    name: "ShippingInformation",
    component: () =>
      import(
        /* webpackChunkName: "ShippingInformation" */ "@/views/ShippingInformation/Index.vue"
      ),
  }
]
