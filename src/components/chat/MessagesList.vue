<template>
  <ul class='messagesList' id='messagesList'>
    <component-loader v-if='messagesPending' color='#9a189c'/>
    <message
      v-for='(message, idx) in conversationMessages'
      :lastMessage = 'idx === lastMessageIdx'
      :timestamp = 'conversationMessages[idx - 1] && conversationMessages[idx - 1].createdAt'
      :key='message._id'
      :message='message'
      :user='user'
      @mounted='messageMounted'/>
    <video-chat-call
      v-if='videoChatCalling'
      :name='name'/>
    <typing-notification
      v-if='isTyping'
      @mounted='notificationMounted'
      @unmounted='notificationUnmounted'/>
  </ul>
</template>

<script>
import ComponentLoader from '../shared/ComponentLoader.vue'
import TypingNotification from './TypingNotification.vue'
import VideoChatCall from './VideoChatCall.vue'
import Message from './Message.vue'
import { eventBus } from '../../eventBus.js'
import throttle from 'lodash/throttle'

export default {
  data () {
    return {
      mountedMessages: 0,
      initialScrollToBottom: false,
      notification: false
    }
  },
  props: ['messages', 'messagesPending', 'user', 'name'],
  components: {
    Message,
    TypingNotification,
    ComponentLoader,
    VideoChatCall
  },
  mounted () {
    const messagesList = document.getElementById('messagesList')
    messagesList && messagesList.addEventListener('scroll', throttle((event) => {
      const scrollHeight = document.getElementById('messagesList').scrollHeight
      if (event.target.scrollTop < scrollHeight * 0.05) {
        this.$store.dispatch('getMessages', {
          conversationId: this.$route.params.conversationId,
          skipMessagesAmount: this.conversationMessages.length
        })
      }
    }, 1000))
  },
  methods: {
    notificationUnmounted () {
      this.notification = false
      this.mountedMessages--
    },
    notificationMounted () {
      this.notification = true
      this.messageMounted()
    },
    messageMounted () {
      this.mountedMessages++
      if (this.notification && this.mountedMessages === this.conversationMessages.length + 1) {
        eventBus.percentScroll(100)
      } else if (this.mountedMessages === this.conversationMessages.length && !this.initialScrollToBottom) {
        this.initialScrollToBottom = true
        eventBus.percentScroll(100)
      } else if (this.mountedMessages === this.conversationMessages.length && this.initialScrollToBottom) {
        eventBus.percentScroll(100)
      }
      eventBus.percentScroll(100)
    }
  },
  computed: {
    isTyping () {
      return this.$store.getters.isTyping
    },
    videoChatCalling () {
      return this.$store.getters.videoChatCalling
    },
    conversationMessages () {
      return this.messages[this.$route.params.conversationId]
    },
    lastMessageIdx () {
      const conversationMessagesReversed = this.conversationMessages.slice().reverse()
      const lastMessageIdx = conversationMessagesReversed.findIndex(lastMessage => lastMessage.author._id !== this.user._id)
      return conversationMessagesReversed.length - 1 - lastMessageIdx
    }
  }
}
</script>

<style>
.messagesList {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  margin-top: 0px;
  margin-bottom: 50px;
  overflow: auto;
  padding-left: 5px;
}
</style>
