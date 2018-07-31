<template>
  <ul class='conversationsList'>
    <friend
      v-for='(friend, idx) in friends'
      :friend='friend'
      :conversations='conversations'
      :key='idx'/>
  </ul>
</template>

<script>
import Friend from './Friend.vue'

export default {
  props: ['friends', 'conversations'],
  components: {
    Friend
  }
}
</script>

<style>
.conversationsList {
  display: flex;
  flex-direction: column;
  padding: 0px;
}
</style>
