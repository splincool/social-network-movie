import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fb from './firebase/config'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap/dist/css/bootstrap.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      created () {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
        }
      },
      render: h => h(App)
    })
  }
})
