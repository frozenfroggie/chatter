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
    console.log('????', payload.newConversation)
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
    console.log('????', payload)
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
    console.log('get conversations!')
    commit('getConversationsPending')
    axiosAuth.get(`/chat`)
      .then(res => {
        console.log('success', res.data.conversations.length)
        commit('getConversationsSuccess', res.data.conversations)
        res.data.conversations.forEach(conversation => {
          console.log(conversation)
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
        console.log('error', err)
        commit('getConversationsError', err)
      })
  },
  saveNewMessage: ({commit, state}, payload) => {
    return new Promise((resolve, reject) => {
      console.log(payload)
      const { author, recipent, conversationId } = payload
      let { messageText = '' } = payload
      if (messageText.length > 30) {
        messageText = messageText.slice(0, 30) + ' ...'
      }
      console.log(conversationId, author._id, recipent._id)
      const newConversation = {
        _id: conversationId,
        participants: [author._id, recipent._id],
        snippet: {
          author,
          messageText,
          recipent
        }
      }
      console.log(newConversation)
      const conversationIndex = state.getConversations.conversations.findIndex(conversation => {
        // console.log(newConversation.participants[0])
        // console.log(newConversation.participants[1])
        // console.log(conversation.participants)
        console.log(conversation._id === newConversation._id)
        return conversation._id === newConversation._id
        // const conversationParticipants = conversation.participants.filter(participantId => participantId === newConversation.participants[0] || participantId === newConversation.participants[1])
        // console.log('len', conversationParticipants.length)
        // console.log('conversationParticipants', conversationParticipants)
        // return conversationParticipants.length === 2
      })
      console.log(conversationIndex)
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
