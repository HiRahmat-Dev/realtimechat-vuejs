import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import firebase from 'firebase'

// Required for side-effects
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyB_jrhMU1l0ARnqML1tTX7tXMNGMAVBdTY',
  authDomain: 'chat-doang.firebaseapp.com',
  databaseURL: 'https://chat-doang.firebaseio.com',
  projectId: 'chat-doang',
  storageBucket: 'chat-doang.appspot.com',
  messagingSenderId: '674714116187',
  appId: '1:674714116187:web:bf12a4aa07719a06c4df7e',
  measurementId: 'G-HHYLPFRG9J'
}
firebase.initializeApp(firebaseConfig)

Vue.prototype.$db = firebase.firestore()
Vue.prototype.$firebase = firebase

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
