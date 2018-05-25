<template>
  <div class="addFriends">
    <search-panel placeholder='Find new friend'/>
    <friends-list :friends='friends'/>
  </div>
</template>

<script>
import SearchPanel from './shared/SearchPanel.vue'
import FriendsList from './addFriends/FriendsList.vue'

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
.addFriends {
  grid-area: content;
}
</style>
