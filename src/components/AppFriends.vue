<template>
  <div class="friends">
    <search-panel placeholder='Type name'/>
    <friends-list :friends='friends'/>
  </div>
</template>

<script>
import SearchPanel from './shared/SearchPanel.vue'
import FriendsList from './friends/FriendsList.vue'

export default {
  data () {
    return {
      friends: [{
        name: 'Christianna Lynn',
        isOnline: true
      }, {
        name: 'June Aline',
        isOnline: false
      }, {
        name: 'Will Tricky',
        isOnline: false
      }]
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
