import Vue from 'vue'
import Router from 'vue-router'
import app from './App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'app',
      component: app,
      meta: {
        // web page title
        title: 'Price between max and min of Bitcoin'
      }
    }
  ]
})
