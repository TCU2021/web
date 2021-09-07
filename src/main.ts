import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import './css/bass-style.css'
import 'element-plus/dist/index.css'
import './ts/main.ts'
import './css/icon-font.css'
// document.title = "快取餐管理系统"
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
