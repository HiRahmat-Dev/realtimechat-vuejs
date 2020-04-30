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
    userInChat: {},
    authUser: null
  },
  mutations: {
    SET_AUTH_USER (state, data) {
      state.authUser = data
    },
    SET_USER_IN_CHAT (state, data) {
      state.userInChat = data
    },
    DELETE_AUTH_USER (state) {
      state.authUser = null
    },
    FETCH_CHATS (state, data) {
      state.chats = data
    },
    FETCH_MESSAGES (state, data) {
      state.messages = data
    }
  },
  actions: {
    fetchAuthUser ({ commit }, uid) {
      return new Promise(resolve => {
        db.collection('users').doc(uid).get()
          .then(doc => {
            const dataLogin = {
              ...doc.data(),
              roleChat: 'sender'
            }
            commit('SET_AUTH_USER', dataLogin)
            resolve(dataLogin.chats)
          })
      })
    },
    fetchChats ({ commit }, chats) {
      return new Promise(resolve => {
        db.collection('chats').orderBy('chatAt').onSnapshot(querySnapshot => {
          const data = []
          querySnapshot.forEach(doc => {
            chats.forEach(chat => {
              if (chat === doc.id) data.push({ id: doc.id, ...doc.data() })
            })
          })
          commit('FETCH_CHATS', data)
          resolve(data)
        })
      })
    },
    fetchMessages ({ commit }, messages) {
      db.collection('messages').orderBy('createdAt').onSnapshot(querySnapshot => {
        const data = []
        querySnapshot.forEach(doc => {
          messages.forEach(message => {
            if (message === doc.id) data.push(doc.data())
          })
        })
        commit('FETCH_MESSAGES', data)
      })
    }
  },
  modules: {
  }
})
