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
  data () {
    return {
      conversations: [{
        name: 'Christianna Lynn',
        preview: 'Hello, amazing work...',
        lastMessage: '12:53',
        isOnline: true
      }, {
        name: 'June Aline',
        preview: 'Ok, no problem.',
        lastMessage: 'MON',
        isOnline: false
      }]
    }
  },
  components: {
    SearchPanel,
    ConversationsList
  }
}
</script>

<style scoped>
.conversations {
  grid-area: content;
}
</style>
