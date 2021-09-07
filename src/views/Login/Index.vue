<template>
  <div class="container">
    <div class="login">
      <div class="hello">
        <img src="@/assets/logo.png" class="img" />
        <span class="title iconfont">快取餐管理平台</span>
      </div>
      <div class="form">
        <div class="inputPart">
          <span class="icon">*</span>
          <span class="text">账号</span>
          <el-input
            class="input"
            v-model="data.username"
            @blur="isHaveUsername"
            @keyup.enter="loginCheck"
          ></el-input>
          <div class="remind" v-show="data.showUsernameRemind">
            账号不能为空
          </div>
        </div>
        <div class="inputPart">
          <span class="icon">*</span>
          <span class="text">密码</span>
          <el-input
            class="input"
            v-model="data.password"
            @blur="isHavePassword"
            type="password"
            @keyup.enter="loginCheck"
          ></el-input>
          <div class="remind" v-show="data.showPasswordRemind">
            密码不能为空
          </div>
        </div>
        <el-button
          class="button"
          type="primary"
          @click="loginCheck"
          v-loading="data.bLoading"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { setCookie } from "@/util/cookie.ts"
export default defineComponent({
  setup() {
    const router = useRouter()
    const data = reactive({
      username: "",
      password: "",
      showUsernameRemind: false,
      showPasswordRemind: false,
      bLoading: false
    })
    const user = {
      username: "admin",
      password: "123456"
    }
    const isHaveUsername = () => {
      if (data.username === "") {
        data.showUsernameRemind = true
      } else {
        data.showUsernameRemind = false
      }
    }
    const isHavePassword = () => {
      if (data.password === "") {
        data.showPasswordRemind = true
      } else {
        data.showPasswordRemind = false
      }
    }
    const loginCheck = () => {
      data.bLoading = true
      setTimeout(() => {
        if (
          data.username === user.username &&
          data.password === user.password
        ) {
          ElMessage({
            message: "登录成功！",
            type: "success",
            duration: 500
          })
          setCookie("isLogin", "true", 100 / 24 / 6)
          setTimeout(() => {
            router.push("/")
          }, 500)
        } else {
          ElMessage({
            message: "登录失败：请检查用户名与密码。",
            type: "error",
            duration: 500
          })
        }
        data.bLoading = false
      }, 300)
    }
    return { data, user, isHaveUsername, isHavePassword, loginCheck }
  }
})
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
.login {
  padding: 60px 40px;
  margin: 0 auto;
  width: 300px;
  height: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.04);
  position: relative;
  top: 50%; /*偏移*/
  margin-top: -300px;
}
.img {
  margin-left: 30px;
  margin-right: 10px;
  width: 50px;
  height: 50px;
}
.hello {
  display: flex;
  align-items: center;
}
.title {
  font-size: 20px;
}
.form {
  margin-top: 60px;
  text-align: left;
}
.inputPart {
  height: 90px;
}
.icon {
  color: red;
}
.text {
  margin-left: 5px;
}
.input {
  margin-top: 5px;
}
.button {
  margin-top: 20px;
  width: 100%;
}
</style>
