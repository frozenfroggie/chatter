<template>
  <ul class='conversationsList'>
    <friend
      v-for='(friend, idx) in friends'
      :friend='friend'
      :key='idx'/>
  </ul>
</template>

<script>
import Friend from './Friend.vue'

export default {
  props: ['friends'],
  components: {
    Friend
  }
}
</script>

<style>
.conversationsList {
  display: flex;
  flex-direction: column;
}
</style>
