import Vue from 'vue'
import App from './components/App.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)

new Vue({
  el: '#app',
  render: h => h(App)
})
