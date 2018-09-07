import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import forms from './modules/forms'
import conversations from './modules/conversations'
import getMessages from './modules/getMessages'
import searchUsers from './modules/searchUsers'
import socket from './modules/socket'
import user from './modules/user'
import resizer from './modules/resizer'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  supportCircular: true,
  modules: ['user', 'tokens', 'conversations']
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
    isTyping: false,
    videoChat: {
      isCalling: false,
      isStarted: false,
      hangup: false
    }
  },
  getters,
  mutations,
  actions,
  modules: {
    forms,
    conversations,
    getMessages,
    searchUsers,
    socket,
    user,
    resizer
  },
  plugins: [vuexLocal.plugin]
})
