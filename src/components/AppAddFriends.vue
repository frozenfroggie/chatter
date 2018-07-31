<template>
  <div class="addFriends">
    <search-panel placeholder='Find new friend' @inputChange='searchUsers'/>
    <users-list :users='users' @addFriend="addFriend"/>
  </div>
</template>

<script>
import SearchPanel from './shared/SearchPanel.vue'
import UsersList from './addFriends/UsersList.vue'

export default {
  methods: {
    searchUsers (searchString) {
      this.$store.dispatch('searchUsers', searchString)
    },
    addFriend (user) {
      this.$store.dispatch('addFriend', user)
    }
  },
  computed: {
    users () {
      const users = this.$store.getters.users
      const friends = this.$store.getters.user.friends
      if (!users) {
        return []
      }
      return users.filter(user => {
        if (friends.length > 0) {
          const isFriend = friends.find(friend => friend._id === user._id)
          return !isFriend // if user is already a friend return false to filter array
        } else {
          return true
        }
      })
    }
  },
  components: {
    SearchPanel,
    UsersList
  }
}
</script>

<style scoped>
.addFriends {
  grid-area: content;
}
</style>
