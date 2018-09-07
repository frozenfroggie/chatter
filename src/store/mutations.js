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
  },
  showVideoChatPrompt: (state) => {
    state.videoChat.isCalling = true
    state.videoChat.hangup = false
  },
  videoChatStart: (state) => {
    state.videoChat.isCalling = false
    state.videoChat.isStarted = true
    state.videoChat.hangup = false
  },
  videoChatHangup: (state) => {
    state.videoChat.isCalling = false
    state.videoChat.isStarted = false
    state.videoChat.hangup = true
  }
}
