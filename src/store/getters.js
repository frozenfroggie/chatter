export default {
  messageText: state => state.messageText,
  addEmoji: state => state.addEmoji,
  emojiPanel: state => state.emojiPanel,
  sendMessageIntention: state => state.sendMessage.intention,
  isTyping: state => state.isTyping
}
