export default {
  updateMessage: ({commit}, payload) => {
    console.log('update!!!', payload)
    commit('updateMessage', payload)
  },
  addEmojiMessage: ({commit}, payload) => {
    console.log('update emoji!!!', payload)
    commit('addEmojiMessage', payload)
  },
  removeMessage: ({commit}) => {
    commit('removeMessage')
  },
  setSendMessageIntention: ({commit}, payload) => {
    commit('setSendMessageIntention', payload)
  },
  typingNotification: ({commit}, payload) => {
    commit('toogleIsTyping')
  },
  openEmojiPanel: ({commit}, payload) => {
    commit('setEmojiPanel', true)
  },
  closeEmojiPanel: ({commit}, payload) => {
    commit('setEmojiPanel', false)
  },
  showVideoChatPrompt: ({commit}) => {
    commit('showVideoChatPrompt')
  },
  videoChatStart: ({commit}) => {
    commit('videoChatStart')
  },
  videoChatHangup: ({commit}) => {
    commit('videoChatHangup')
  }
}
