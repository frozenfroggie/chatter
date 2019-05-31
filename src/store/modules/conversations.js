import axiosAuth from '../../config/axiosAuth'

const state = {
  getConversations: {
    pending: false,
    conversations: null,
    error: false
  },
  activeConversationsIds: []
}

const getters = {
  getConversations: state => state.getConversations,
  conversations: state => state.getConversations.conversations,
  activeConversationsIds: state => state.activeConversationsIds
}

const mutations = {
  updateConversation: (state, payload) => {
    state.getConversations.conversations.splice(payload.conversationIndex, 1, payload.newConversation)
  },
  pushNewConversation: (state, payload) => {
    state.getConversations.conversations.push(payload)
  },
  getConversationsPending: (state) => {
    state.getConversations.conversations = null
    state.getConversations.pending = true
  },
  getConversationsSuccess: (state, payload) => {
    state.getConversations.conversations = payload
    state.getConversations.pending = false
  },
  getConversationsError: (state, payload) => {
    state.getConversations.error = payload
    state.getConversations.pending = false
  },
  updateStatus: (state, payload) => {
    if (Object.values(payload)[0] > 1) {
      state.activeConversationsIds.push(Object.keys(payload)[0])
    }
  },
  updateActiveConversations: (state, payload) => {
    state.activeConversationsIds = state.activeConversationsIds.filter(conversationId => conversationId !== payload)
  }
}

const actions = {
  getConversations: ({commit, dispatch, state}, payload) => {
    commit('getConversationsPending')
    axiosAuth.get(`/chat`)
      .then(res => {
        commit('getConversationsSuccess', res.data.conversations)
        res.data.conversations.forEach(conversation => {
          let bot = false
          if (conversation.participants[0] === '5cebee370ce06d0004cfa086' || conversation.participants[1] === '5cebee370ce06d0004cfa086') {
            bot = true
          }
          dispatch('socketCustomEvent', {
            eventName: 'enterConversation',
            data: {
              conversationId: conversation._id,
              userId: payload.user._id,
              bot
            }
          })
        })
      })
      .catch(err => {
        commit('getConversationsError', err)
      })
  },
  saveNewMessage: ({commit, state}, payload) => {
    return new Promise((resolve, reject) => {
      const { author, recipent, conversationId } = payload
      let { messageText = '' } = payload
      if (messageText.length > 30) {
        messageText = messageText.slice(0, 30) + ' ...'
      }
      const newConversation = {
        _id: conversationId,
        participants: [author._id, recipent._id],
        snippet: {
          author,
          messageText,
          recipent
        }
      }
      const conversationIndex = state.getConversations.conversations.findIndex(conversation => conversation._id === newConversation._id)
      commit('newMessage', {message: payload, conversationId})
      if (conversationIndex === -1) {
        commit('pushNewConversation', newConversation)
      } else {
        commit('updateConversation', {newConversation, conversationIndex})
      }
      resolve()
    })
  },
  leaveConversation: ({commit, dispatch, state}, payload) => {
    commit('updateActiveConversations', payload)
  },
  logout: ({commit, state, dispatch}) => {
    commit('logout')
    dispatch('leaveConversations', {conversations: state.getConversations.conversations})
  },
  updateStatus: ({commit, dispatch, state}, payload) => {
    commit('updateStatus', payload)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
