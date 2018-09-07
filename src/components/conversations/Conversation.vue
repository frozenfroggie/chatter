<template>
  <div class='conversationLabel' @click='openChat' :style='[$route.params.conversationId === conversation._id && {"background-color": "#2A384A"}]'>
    <div class='avatarContainer'>
      <icon name="user-circle" class='avatar' scale="2.5"></icon>
      <div :class='{online: isOnline}'></div>
    </div>
    <div class='content'>
      <div class='conversationName'>
        {{ conversation.snippet.author.username.charAt(0).toUpperCase() + conversation.snippet.author.username.slice(1)}}
      </div>
      <div class='conversationPreview'>
        {{ conversation.snippet.messageText | deleteNbsp }}
      </div>
    </div>
    <div class='timestamp'>
      {{ conversation.snippet.createdAt | toShortData }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['conversation'],
  methods: {
    openChat () {
      this.$store.dispatch('getMessages', {
        conversationId: this.conversation._id,
        skipMessagesAmount: 0
      })
      this.$router.push({name: 'chat', params: {conversationId: this.conversation._id}})
    }
  },
  computed: {
    isOnline () {
      const activeConversationsIds = this.$store.getters.activeConversationsIds
      if (!activeConversationsIds) {
        return false
      }
      for (let i = 0; i < activeConversationsIds.length; i++) {
        return activeConversationsIds[i] === this.conversation._id
      }
    }
  }
}
</script>

<style scoped>
.conversationLabel {
  display: grid;
  grid-template-columns: 0px 50px auto 70px 0px;
  grid-template-rows: 80px;
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
.conversationName {
  text-align: left;
  color: white;
  font-size: 0.9em;
  font-weight: 600;
  opacity: .9;
}
.conversationPreview {
  line-height: 1.5;
  font-size: 0.8em;
  text-align: left;
  color: rgba(250,250,250,0.5);
}
.timestamp {
  grid-area: timestamp;
  padding-top: 15px;
  font-size: 0.7em;
  align-self: flex-start;
  color: rgba(250,250,250,0.5);
}
</style>
