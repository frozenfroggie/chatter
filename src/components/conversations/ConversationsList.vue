<template>
  <div class='conversationsList'>
    <conversation
      v-for='(conversation, idx) in conversations'
      :conversation='conversation'
      :key='idx'/>
  </div>
</template>

<script>
import Conversation from './Conversation.vue'

export default {
  props: ['conversations'],
  components: {
    Conversation
  }
}
</script>

<style>
.conversationsList {
  display: flex;
  flex-direction: column;
}
</style>
