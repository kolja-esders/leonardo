import Vue from 'vue'
import App from './components/App.vue'
import Buefy from 'buefy'
import VueRouter from 'vue-router'
import 'buefy/lib/buefy.css'
import routes from './routes.js'

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

Vue.use(Buefy)
Vue.use(VueRouter)

new Vue({
  router,
  el: '#app'
})
