<template>
  <div class="chat" id='chat' @mousemove='handleMouseMove' @mouseup='handleMouseUp' @click='closeEmojiPanel'>
    <the-resizer />
    <profile-panel :name='friend && friend.username' :isOnline='isOnline'/>
    <div v-show='isVideoChatStarted' class="videoChat">
      <video id="remoteVideo" class="remoteVideo" autoplay>
      </video>
      <video id="localVideo" class="localVideo" autoplay muted
        @click='minimize' :style="{width: localVideoWidth + 'px'}">
      </video>
      <div class='hangupContainer'>
        <div class="hangup">
          <icon name="phone" scale="1.5" flip="horizontal" @click.native='videoChatHangup'/>
        </div>
      </div>
    </div>
    <messages-list :messages='messages' :messagesPending='messagesPending' :user='user' :name='friend && friend.username'/>
    <message-input @sendMessage="sendMessage"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ProfilePanel from './chat/ProfilePanel.vue'
import MessagesList from './chat/MessagesList.vue'
import MessageInput from './chat/MessageInput.vue'
import ComponentLoader from './shared/ComponentLoader.vue'
import TheResizer from './unique/TheResizer.vue'
import { eventBus } from '../eventBus.js'

export default {
  components: {
    ProfilePanel,
    MessagesList,
    MessageInput,
    ComponentLoader,
    TheResizer
  },
  data () {
    return {
      localVideoWidth: 100,
      minimized: true
    }
  },
  mounted () {
    this.getMessages()
  },
  updated () {
    this.getMessages()
  },
  created () {
    this.turnOnResizer()
  },
  beforeDestroy () {
    this.turnOffResizer()
  },
  computed: {
    ...mapGetters(['isVideoChatStarted', 'user', 'messages', 'messagesPending', 'activeConversationsIds', 'isTyping']),
    conversations () {
      return this.$store.getters.getConversations.conversations
    },
    friend () {
      const conversation = this.conversations && this.conversations.find(conversation => {
        return conversation._id === this.$route.params.conversationId
      })
      const friendId = conversation && conversation.participants.find(participantId => this.user._id !== participantId)
      const friend = this.user.friends.find(friend => {
        return friend._id === friendId
      })
      return friend
    },
    isOnline () {
      if (!this.activeConversationsIds) {
        return false
      }
      for (let i = 0; i < this.activeConversationsIds.length; i++) {
        return this.activeConversationsIds[i] === this.$route.params.conversationId
      }
    }
  },
  methods: {
    ...mapActions(['videoChatHangup', 'closeEmojiPanel', 'socketSendMessage', 'handleMouseUp', 'handleMouseMove', 'turnOffResizer', 'turnOnResizer']),
    sendMessage (messageText) {
      this.socketSendMessage({
        author: this.user,
        recipent: this.friend,
        conversationId: this.$route.params.conversationId,
        messageText
      }).then(() => {
        eventBus.percentScroll(100)
      }).catch(err => {
        console.log(err)
      })
    },
    minimize () {
      if (this.minimized) {
        this.localVideoWidth = 200
        this.minimized = false
      } else {
        this.localVideoWidth = 100
        this.minimized = true
      }
    },
    getMessages () {
      if (!this.messages.hasOwnProperty(this.$route.params.conversationId) && !this.messagesPending) {
        this.$store.dispatch('getMessages', {
          conversationId: this.$route.params.conversationId,
          skipMessagesAmount: 0
        })
      }
    }
  }
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #c33460, #9a189c);
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #9a189c, #c33460);
}

.chat {
  position: relative;
  grid-area: content;
  background-color: white;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  height: 101vh;
  user-select: none;
  z-index: 10;
}
.videoChat {
  position: absolute;
  top: 50px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 11;
}
.localVideo {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 12;
}
.localVideo:hover {
  cursor: pointer;
}
.remoteVideo {
  min-height: 100%;
  width: 100%;
}
@media only screen and (min-width: 720px) {
  .chat {
    grid-area: helper;
  }
}
.hangupContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.hangup {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 2px 10px 2px;
  color: white;
  height: 45px;
  width: 45px;
  background-color: red;
  transform: rotate(135deg);
  border-radius: 50%;
}
.hangup:hover {
  cursor: pointer;
}
</style>
