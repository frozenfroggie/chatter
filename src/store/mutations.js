import { getDefaultState } from './store.js'

export default {
  emailSend: (state) => {
    state.tokens.verificationToken.send = true
  },
  updateMessage: (state, payload) => {
    state.messageText = payload
  },
  addEmojiMessage: (state, payload) => {
    state.addEmoji = payload
    state.messageText += payload
  },
  removeMessage: (state) => {
    state.messageSend = true
  },
  resetState: (state) => {
    Object.assign(state, getDefaultState())
  },
  sendMessagePending: (state, payload) => {
    state.sendMessage.pending = true
  },
  sendMessageSuccess: (state, payload) => {
    state.sendMessage.pending = false
    state.sendMessage.success = true
  },
  setSendMessageIntention: (state, payload) => {
    state.sendMessage.intention = payload
  },
  toogleIsTyping: (state) => {
    state.isTyping = !state.isTyping
  },
  setEmojiPanel: (state, payload) => {
    state.emojiPanel = payload
  }
}
