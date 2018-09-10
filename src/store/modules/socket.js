const state = {
  socket: null
}

const getters = {
  socket: state => state.socket
}

const mutations = {
  socketConnect: (state, payload) => {
    // eslint-disable-next-line
    state.socket = io(payload)
  }
}
const actions = {
  socketConnect: ({commit}, payload) => {
    commit('socketConnect', payload)
  },
  socketCustomEvent: ({commit, state}, payload) => {
    const { eventName, data } = payload
    state.socket.emit(eventName, { data })
  },
  leaveConversations: ({commit, dispatch, state}, payload) => {
    payload.conversations.forEach(conversation => {
      dispatch('socketCustomEvent', {
        eventName: 'leaveConversation',
        data: conversation._id
      })
    })
  },
  socketSendMessage: ({commit, dispatch, state}, payload) => {
    commit('sendMessagePending')
    return new Promise((resolve, reject) => {
      const { author, recipent, conversationId, messageText } = payload
      state.socket.emit('sendMessage', { author, recipent, conversationId, messageText }, () => {
        const newMessage = {
          author,
          recipent,
          conversationId,
          messageText
        }
        commit('sendMessageSuccess')
        dispatch('saveNewMessage', newMessage)
        resolve()
      })
    })
  },
  videoChatAnswer: ({commit, state, dispatch}, payload) => {
    state.socket.emit('videoChatAnswer', payload)
    dispatch('videoChatStart')
  },
  videoChatDecline: ({commit, state, dispatch}, payload) => {
    state.socket.emit('videoChatDecline', payload)
    dispatch('videoChatHangup')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
