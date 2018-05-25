<template>
  <ul class='messagesList'>
    <message
      v-for='(message, idx) in messages'
      :message='message'
      :key='idx'/>
  </ul>
</template>

<script>
import Message from './Message.vue'

export default {
  props: ['messages'],
  components: {
    Message
  }
}
</script>

<style>
.messagesList {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 85px);
  width: auto;
  padding: 10px;
  overflow: auto;
}
</style>
