// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store'
import {routerMode} from './config/env'
import './config/rem'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: routerMode,
  strick: process.env.NODE_ENV !== 'production',
  srollBehavior (to, from, savePostion) {
    if (savePostion) {
      return savePostion
    } else {
      if (from.meta.keepAlive) {
        from.meta.savePostion = document.body.scrollTop;
      }
      return {x: 0, y: to.meta.savePostion || 0}
    }
  }
})

// const store = new Vuex.Store({

// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
}).$mount('#app')
