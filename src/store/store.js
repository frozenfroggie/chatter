import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import conversations from './modules/conversations'
import getMessages from './modules/getMessages'
import searchUsers from './modules/searchUsers'
import videoChat from './modules/videoChat'
import resizer from './modules/resizer'
import socket from './modules/socket'
import forms from './modules/forms'
import user from './modules/user'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  supportCircular: true,
  modules: ['user', 'tokens']
})

export const store = new Vuex.Store({
  state: {
    socket: null,
    tokens: {
      accessToken: null,
      refreshToken: null,
      verificationToken: {
        send: false,
        confirmed: false
      }
    },
    messageText: '',
    addEmoji: '',
    emojiPanel: false,
    sendMessage: {
      intention: false,
      pending: false,
      success: false,
      error: false
    },
    isTyping: false
  },
  getters,
  mutations,
  actions,
  modules: {
    conversations,
    getMessages,
    searchUsers,
    videoChat,
    resizer,
    socket,
    forms,
    user
  },
  plugins: [vuexLocal.plugin]
})
