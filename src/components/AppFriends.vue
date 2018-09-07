<template>
  <div class="friends">
    <search-panel placeholder='Type name'/>
    <friends-list :friends='friends' :conversations='conversations'/>
  </div>
</template>

<script>
import SearchPanel from './shared/SearchPanel.vue'
import FriendsList from './friends/FriendsList.vue'

export default {
  computed: {
    friends () {
      return this.$store.getters.user.friends
    },
    conversations () {
      return this.$store.getters.getConversations.conversations
    }
  },
  components: {
    SearchPanel,
    FriendsList
  }
}
</script>

<style scoped>
.friends {
  grid-area: content;
}
</style>
