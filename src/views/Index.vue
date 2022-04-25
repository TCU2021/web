<template>
  <div class="container">
    <div class="content">
      <Sidebar
        :sidebars="navigationList"
        class="sidebar"
        @click="setPathTitle()"
      />
      <div class="show">
        <router-view class="view" v-slot="{ Component }">
          <div class="header">
            <div class="title">
              {{ data.pathTitle }}
            </div>
            <div class="iconfont icon">&#xe652;</div>
          </div>
          <div class="main">
            <div class="main-context">
              <el-scrollbar
                class="main-context-scrollbar"
                view-style="height:100%;width:100%;"
              >
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
                <el-backtop
                  target=".main-context-scrollbar .el-scrollbar__wrap"
                  :visibility-height="10"
                  :bottom="70"
                ></el-backtop>
              </el-scrollbar>
            </div>
          </div>
          <div class="footer">
            <div class="time">{{ data.time }}</div>
          </div>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import Sidebar from "@/views/Sidebar.vue"
import { useRoute } from "vue-router"
import { navigationList } from "@/context/navigation"
import { getTime } from "@/util/time"
export default defineComponent({
  name: "Index",
  setup() {
    const route = useRoute()
    const data = reactive({
      pathTitle: "",
      time: "",
    })
    const setPathTitle = () => {
      let path = ""
      setTimeout(() => {
        path = route.path
        for (let i = 0; i < navigationList.length; i++) {
          if (navigationList[i].path === path) {
            data.pathTitle = navigationList[i].title
            return path
          }
        }
        return ""
      }, 40)
    }
    window.onload = () => {
      clearInterval()
      setPathTitle()
      // let str = setPathTitle()
      // console.log(str)
    }
    setPathTitle()
    setInterval(() => {
      data.time = "" + getTime()
    }, 1000)
    return { navigationList, setPathTitle, data }
  },
  components: {
    Sidebar,
  },
})
</script>

<style lang="scss">
.container,
.content,
.show,
.main-context-scrollbar {
  height: 100%;
}
.content {
  display: flex;
}
.header,
.footer {
  padding: 0 20px;
  height: 50px;
  display: flex;
  align-items: center;
}
.icon {
  margin-left: auto;
}
.main {
  background-color: #f2f2f2;
  /* 高度算式为 总高度 - header与footer的高度以及线高度 */
  height: calc(100% - 2 * 50px - 2 * 1px);
  border-top: 1px solid #a4a4a4;
  border-bottom: 1px solid #a4a4a4;
}
.main-context {
  overflow-x: hidden;
  background-color: white;
  /* 高度算式为 总高度 - 上下的padding与margin高度 */
  height: calc(100% - 2 * 10px - 2 * 20px);
  border-radius: 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
}
.toTop {
  z-index: 10;
}
.sidebar {
  width: 200px;
  background-color: #2e2e2e;
}
.show {
  flex: 1;
  min-width: 0;
}

//为订单区分状态
.orderList-one {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
.orderList-two {
  background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
}
.orderList-three {
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}
.orderList-four {
  background-image: linear-gradient(25deg, #f19135, #cfbb33, #a0de31, #44ff2e);
}

//为是否停用区分状态
.is-stop {
  opacity: 0.5;
  color: #fa709a;
}
</style>
