<template>
  <ul class='messagesList' id='messagesList'>
    <message
      @mounted='messageMounted'
      v-for='(message, idx) in messages'
      :message='message'
      :user='user'
      :key='idx'/>
  </ul>
</template>

<script>
import Message from './Message.vue'

export default {
  data () {
    return {
      mountedMessages: 0
    }
  },
  props: ['messages', 'user'],
  components: {
    Message
  },
  methods: {
    messageMounted () {
      this.mountedMessages++
      if (this.mountedMessages === this.messages.length) {
        document.getElementById('messagesList').scrollTop = document.getElementById('messagesList').scrollHeight
      }
    }
  }
}
</script>

<style>
.messagesList {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
  width: auto;
  padding: 10px;
  overflow: auto;
  margin: 0px;
}
</style>
