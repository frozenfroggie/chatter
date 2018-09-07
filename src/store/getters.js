export default {
  messageText: state => state.messageText,
  addEmoji: state => state.addEmoji,
  emojiPanel: state => state.emojiPanel,
  sendMessageIntention: state => state.sendMessage.intention,
  isTyping: state => state.isTyping,
  videoChatCalling: state => state.videoChat.isCalling,
  isVideoChatStarted: state => state.videoChat.isStarted,
  isVideoChatHangup: state => state.videoChat.hangup
}
