<template>
  <div class="conversations"
    @mousemove='handleMouseMove'
    @mouseup='handleMouseUp'
    @click='closeEmojiPanel'
    :style="[resizerTurned ? {'width': resizerPositionX - 50 + 'px'} : {}]">
    <search-panel placeholder='Search conversation'/>
    <conversations-list :conversations='conversations' v-if="conversations"/>
    <component-loader v-else color='white'/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import SearchPanel from './shared/SearchPanel.vue'
import ConversationsList from './conversations/ConversationsList.vue'
import ComponentLoader from './shared/ComponentLoader.vue'

export default {
  components: {
    SearchPanel,
    ConversationsList,
    ComponentLoader
  },
  computed: {
    conversations () {
      const conversations = this.$store.getters.getConversations.conversations
      const user = this.$store.getters.user
      conversations && conversations.forEach(conversation => {
        if (conversation.snippet && conversation.snippet.author._id === user._id) {
          conversation.snippet.author.username = conversation.snippet.recipent.username
        }
      })
      return conversations
    },
    resizerPositionX () {
      return this.$store.getters.resizerPositionX
    },
    resizerTurned () {
      return this.$store.getters.resizerTurned
    }
  },
  methods: {
    ...mapActions(['handleMouseUp', 'handleMouseMove', 'closeEmojiPanel'])
  }
}
</script>

<style scoped>
.conversations {
  grid-area: content;
  width: auto;
  height: 100vh;
  border-right: 1px solid rgba(250,250,250,0.1);
  padding: 1px;
}
</style>
