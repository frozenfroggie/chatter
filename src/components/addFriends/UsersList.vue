<template>
  <ul class='conversationsList'>
    <user
      v-for='(user, idx) in users'
      :user='user'
      :key='idx'
      @addFriend='addFriend'/>
  </ul>
</template>

<script>
import User from './User.vue'

export default {
  props: ['users'],
  components: {
    User
  },
  methods: {
    addFriend (user) {
      this.$emit('addFriend', user)
    }
  }
}
</script>

<style>
.conversationsList {
  display: flex;
  flex-direction: column;
}
</style>
