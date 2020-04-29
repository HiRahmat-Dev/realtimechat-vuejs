import Vue from 'vue'
import Vuex from 'vuex'
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
const db = firebase.firestore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    authUser: {}
  },
  mutations: {
    SET_AUTH_USER (state, data) {
      state.authUser = data.user
    },
    DELETE_AUTH_USER (state) {
      state.authUser = {}
    },
    FETCH_MESSAGES (state, data) {
      state.messages = data
    }
  },
  actions: {
    fetchMessages ({ commit }) {
      db.collection('messages').orderBy('createdAt').onSnapshot(querySnapshot => {
        const data = []
        querySnapshot.forEach(doc => {
          data.push(doc.data())
        })
        commit('FETCH_MESSAGES', data)
      })
    }
  },
  modules: {
  }
})
