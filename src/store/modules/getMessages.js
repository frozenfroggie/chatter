import axiosAuth from '../../config/axiosAuth'

const state = {
  pending: false,
  error: false,
  messages: {},
  endOfConversation: {}
}

const getters = {
  messages: state => state.messages,
  messagesPending: state => state.pending,
  endOfConversation: state => state.endOfConversation
}

const mutations = {
  newMessage: (state, payload) => {
    if (!state.messages[payload.conversationId]) {
      state.messages[payload.conversationId] = []
    }
    let messagesCopy = [...state.messages[payload.conversationId], payload.message]
    state.messages = {...state.messages, [payload.conversationId]: messagesCopy}
  },
  getMessagesPending: (state) => {
    state.pending = true
  },
  getMessagesSuccess: (state, payload) => {
    state.pending = false
    if (state.messages[payload.conversationId]) {
      if (payload.messages.length === 0) {
        state.endOfConversation = Object.assign({}, state.endOfConversation, { [payload.conversationId]: true })
      } else {
        state.messages[payload.conversationId] = payload.messages.concat(state.messages[payload.conversationId])
      }
    } else {
      state.messages = {...state.messages, [payload.conversationId]: payload.messages}
    }
  },
  getMessagesError: (state, payload) => {
    state.error = payload
    state.pending = false
  }
}

const actions = {
  getMessages: ({commit}, payload) => {
    commit('getMessagesPending')
    axiosAuth.get(`/chat/messages?conversation=${payload.conversationId}&skip=${payload.skipMessagesAmount}`)
      .then(res => {
        const messagesReversed = res.data.messages.reverse()
        commit('getMessagesSuccess', {
          messages: messagesReversed,
          conversationId: payload.conversationId
        })
      })
      .catch(err => {
        commit('getMessagesError', err)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
