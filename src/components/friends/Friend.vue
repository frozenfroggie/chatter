<template>
  <li>
    <div
      @click='openChat'
      :to="{ name: 'chat', params: {conversationId}}"
      class='conversationLabel'
      tag='div'>
      <div class='avatarContainer'>
        <icon name="user-circle" class='avatar' scale="2.5"></icon>
        <div :class='{online: true}'></div>
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
export default {
  props: ['friend', 'conversations'],
  methods: {
    openChat () {
      this.$store.dispatch('getMessages', this.conversationId)
      this.$router.push('/chat/' + this.conversationId)
    }
  },
  computed: {
    conversationId () {
      let conversationId
      this.conversations.forEach(conversationOne => {
        conversationId = this.friend.conversations.find(conversation => {
          return conversationOne._id === conversation
        })
      })
      return conversationId
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
