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
    chats: [],
    messages: [],
    authUser: {}
  },
  mutations: {
    SET_AUTH_USER (state, data) {
      state.authUser = data
    },
    DELETE_AUTH_USER (state) {
      state.authUser = {}
    },
    FETCH_CHATS (state, data) {
      state.chats = data
    },
    FETCH_MESSAGES (state, data) {
      state.messages = data
    }
  },
  actions: {
    fetchChats ({ commit }, uid) {
      console.log(data)
      db.collection('chats').where('uid', '==', uid).onSnapshot(querySnapshot => {
        const data = []
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() })
        })
        commit('FETCH_CHATS', data)
      })
    },
    fetchMessages ({ commit }, chatId) {
      db.collection('messages').where('chatId', '==', chatId).onSnapshot(querySnapshot => {
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
