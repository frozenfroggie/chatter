<template>
  <li>
    <div
      @click='openChat'
      :to="{ name: 'chat', params: {conversationId}}"
      class='conversationLabel'
      tag='div'>
      <div class='avatarContainer'>
        <icon name="user-circle" class='avatar' scale="2.5"></icon>
        <div :class='{online: isOnline}'></div>
      </div>
      <div class='content'>
        <div class='friendName'>
          {{ friend.username.charAt(0).toUpperCase() + friend.username.slice(1) }}
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import axiosAuth from '../../config/axiosAuth'

export default {
  props: ['friend', 'conversations'],
  data () {
    return {
      conversationId: undefined
    }
  },
  mounted () {
    axiosAuth.get('/chat/conversationId/' + this.friend._id).then(res => {
      this.conversationId = res.data.conversationId
    }).catch(() => {
      // ignore
    })
  },
  methods: {
    openChat () {
      this.$store.dispatch('getMessages', {
        conversationId: this.conversationId,
        skipMessagesAmount: 0
      })
      this.$router.push('/chat/' + this.conversationId)
    }
  },
  computed: {
    isOnline () {
      const activeConversationsIds = this.$store.getters.activeConversationsIds
      if (!activeConversationsIds) {
        return false
      }
      for (let i = 0; i < activeConversationsIds.length; i++) {
        return activeConversationsIds[i] === this.conversationId
      }
    }
  }
}
</script>

<style scoped>
.conversationLabel {
  display: grid;
  grid-template-columns: 0px 50px auto 30px 0px;
  grid-template-rows: 60px;
  grid-column-gap: 5px;
  align-items: center;
  grid-template-areas:
    ". avatar content timestamp ."
}
.conversationLabel:hover {
  cursor: pointer;
}
.avatarContainer {
  position: relative;
  height: 38px;
  width: 38px;
  border-radius: 50%;
  grid-area: avatar;
  justify-self: center;
}
.avatar {
  color: white;
  opacity: .4;
}
.online {
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 6px;
  width: 6px;
  border: 3px solid rgb(46, 59, 79);
  border-radius: 50%;
  background-color: rgb(66, 183, 42);
}
.content {
  grid-area: content;
}
.friendName {
  text-align: left;
  color: white;
  font-size: 0.9em;
  font-weight: 600;
  opacity: .9;
}
</style>
