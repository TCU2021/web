import { RouteRecordRaw } from "vue-router"
export const infoList: Array<RouteRecordRaw> = [
  {
    path: "Hello",
    name: "Hello",
    component: () =>
      import(/* webpackChunkName: "Hello" */ "@/views/Hello/Index.vue"),
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
