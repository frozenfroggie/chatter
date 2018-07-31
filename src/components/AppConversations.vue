<template>
  <div class="conversations">
    <search-panel placeholder='Search conversation'/>
    <conversations-list :conversations='conversations'/>
  </div>
</template>

<script>
import SearchPanel from './shared/SearchPanel.vue'
import ConversationsList from './conversations/ConversationsList.vue'

export default {
  components: {
    SearchPanel,
    ConversationsList
  },
  computed: {
    conversations () {
      const conversations = this.$store.getters.conversations
      console.log(conversations[0])
      const user = this.$store.getters.user
      try {
        conversations.forEach(conversation => {
          if (conversation.snippet.author._id === user._id) {
            conversation.snippet.author.username = conversation.snippet.recipent.username
          }
        })
      } catch (err) {
        console.log('Not ready yet', err)
      }
      return conversations
    }
  }
}
</script>

<style scoped>
.conversations {
  grid-area: content;
}
</style>
