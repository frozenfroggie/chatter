<template>
  <div class="chat" id='chat'>
    <profile-panel :name='friend.username'/>
    <messages-list :messages='messages' :user='user'/>
    <message-input @sendMessage="sendMessage"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProfilePanel from './chat/ProfilePanel.vue'
import MessagesList from './chat/MessagesList.vue'
import MessageInput from './chat/MessageInput.vue'

export default {
  components: {
    ProfilePanel,
    MessagesList,
    MessageInput
  },
  computed: {
    ...mapGetters(['user', 'messages', 'conversations']),
    friend () {
      const conversation = this.conversations.find(conversation => conversation._id === this.$route.params.conversationId)
      const friend = conversation.participants.find(participant => this.user._id !== participant._id)
      return friend
    }
  },
  methods: {
    ...mapActions(['socketSendMessage', 'scrollToBottom']),
    sendMessage (messageText) {
      console.log('chat!!!', this.user)
      this.socketSendMessage({
        author: this.user,
        recipent: this.friend,
        conversationId: this.$route.params.conversationId,
        messageText
      }).then(() => {
        this.scrollToBottom()
      })
    }
  }
}
</script>

<style scoped>
.chat {
  grid-area: content;
  background-color: #F4F8FD;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, .5);
}
@media only screen and (min-width: 720px) {
  .chat {
    grid-area: helper;
  }
}
</style>
