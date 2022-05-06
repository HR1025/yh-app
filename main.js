import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 挂载全局组件
import YhHead from '@/components/yh-head/yh-head.vue'
Vue.component('yh-head', YhHead)
import YhSortColumn from '@/components/yh-sort-column/yh-sort-column.vue'
Vue.component('yh-sort-column', YhSortColumn)
import YhCartoonSwiper from '@/components/yh-cartoon-swiper/yh-cartoon-swiper.vue'
Vue.component('yh-cartoon-swiper', YhCartoonSwiper)
import YhTimeTable from '@/components/yh-time-table/yh-time-table.vue'
Vue.component('yh-time-table', YhTimeTable)
import YhSortPreview from '@/components/yh-sort-preview/yh-sort-preview.vue'
Vue.component('yh-sort-preview', YhSortPreview)