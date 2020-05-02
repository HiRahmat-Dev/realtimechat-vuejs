import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    chats: [],
    messages: [],
    userInChat: {},
    authUser: null
  },
  mutations: {
    SET_USERS (state, data) {
      state.users = data
    },
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
      const arrData = [data]
      let found = false
      for (let i = 0; i < state.chats.length; i++) {
        if (state.chats[i].id === data.id) {
          const newChats = state.chats.map(obj => arrData.find(o => o.id === obj.id) || obj)
          state.chats = newChats
          found = true
          break
        }
      }
      if (!found) {
        state.chats.push(data)
      }
    },
    FETCH_MESSAGES (state, data) {
      state.messages = data
    },
    LOGOUT (state) {
      state.users = []
      state.chats = []
      state.messages = []
      state.userInChat = {}
      state.authUser = null
    }
  },
  actions: {
  },
  modules: {
  }
})
