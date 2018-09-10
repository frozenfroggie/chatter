<template>
  <div class="app">

    <transition
      enter-active-class='animated fadeInLeft'
      leave-active-class='animated fadeOutLeft'>
      <the-navigation v-if='authenticated'/>
    </transition>

    <transition
      enter-active-class='animated fadeInUp'
      leave-active-class='animated fadeOutUp'>
      <router-view v-if='shouldShowConversations && authenticated'/>
    </transition>

    <transition
      enter-active-class='animated fadeInRight'
      leave-active-class='animated fadeOutRight'>
      <router-view name="chat" v-if='shouldShowChat && authenticated'/>
    </transition>

    <transition
      enter-active-class='animated fadeInUp'
      leave-active-class='animated fadeOutUp'
      mode='out-in'>
      <router-view name='login' v-if='!authenticated'/>
    </transition>

    <transition
      enter-active-class='animated fadeInUp'
      leave-active-class='animated fadeOutUp'
      mode='out-in'>
      <router-view name='signup' v-if='!authenticated'/>
    </transition>

    <transition
      enter-active-class='animated fadeIn'
      leave-active-class='animated fadeOut'>
      <router-link to="friends" tag='div' class='floatingActionBtn'
        v-show='floatingActionBtn && authenticated'>
        <icon name='plus' class='plus'></icon>
      </router-link>
    </transition>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheNavigation from './components/unique/navigation/TheNavigation.vue'
import TheResizer from './components/unique/TheResizer'
import { eventBus } from './eventBus.js'

export default {
  name: 'App',
  components: {
    TheNavigation,
    TheResizer
  },
  data () {
    return {
      floatingActionBtn: true,
      shouldShowConversations: true,
      shouldShowChat: false,
      stopTypingTimer: null
    }
  },
  beforeMount () {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://chatter-server.herokuapp.com/socket.io/socket.io.js'
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = () => {
      this.connect()
    }
  },
  mounted () {
    if (this.authenticated) {
      console.log('GET CONVERSATIONS')
      this.getConversations({user: this.user})
    }
    if (this.$route.params.conversationId) {
      this.floatingActionBtn = false
    }
    if (window.innerWidth > 720) {
      this.shouldShowChat = true
    }
    window.addEventListener('resize', this.handleResizing)
  },
  computed: {
    ...mapGetters(['authenticated', 'friends', 'socket', 'user', 'isTyping', 'conversations'])
  },
  methods: {
    ...mapActions(['socketConnect', 'socketCustomEvent', 'saveNewMessage', 'getConversations', 'updateStatus', 'leaveConversation', 'typingNotification']),
    handleResizing () {
      if (window.innerWidth > 720) {
        this.shouldShowChat = true
        this.shouldShowConversations = true
      } else if (this.shouldShowConversations && !this.$route.params.conversationId) {
        this.shouldShowChat = false
      } else if (this.shouldShowChat) {
        this.shouldShowConversations = false
      }
    },
    connect () {
      this.socketConnect('https://chatter-server.herokuapp.com')
      this.socket.on('connect', () => {
        console.log('Connected to server!')
      })
      this.socket.on('typingNotification', () => {
        if (!this.isTyping) {
          this.typingNotification()
          this.stopTypingTimer = setTimeout(() => {
            this.typingNotification()
          }, 1000)
        } else if (this.stopTypingTimer) {
          clearTimeout(this.stopTypingTimer)
          this.stopTypingTimer = setTimeout(() => {
            this.typingNotification()
          }, 1000)
        }
      })
      this.socket.on('newMessage', newMessage => {
        const messageNotificationSound = new Audio('/static/stairs.mp3')
        messageNotificationSound.play()
        if (this.isTyping) {
          clearTimeout(this.stopTypingTimer)
          this.typingNotification()
        }
        this.saveNewMessage(newMessage).then(() => {
          eventBus.percentScroll(100)
        })
      })
      this.socket.on('enterConversation', data => {
        this.updateStatus(data)
      })
      this.socket.on('leaveConversation', data => {
        this.leaveConversation(data)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/') {
        this.floatingActionBtn = true
        this.shouldShowChat = false
        this.shouldShowConversations = true
      } else {
        this.floatingActionBtn = false
      }
      if (to.params.conversationId && window.innerWidth > 720) {
        this.shouldShowChat = true
        this.shouldShowConversations = true
      } else if (!to.params.conversationId) {
        this.shouldShowConversations = true
      } else {
        this.shouldShowChat = true
        this.shouldShowConversations = false
      }
    },
    authenticated (isAuthenticated) {
      console.log(isAuthenticated)
      if (isAuthenticated) {
        console.log('GET CONVERSATIONS')
        this.getConversations({user: this.user})
      }
    }
  }
}
</script>

<style>
.fadeInUp {
  -webkit-animation: fadeInUp .4s;
  -moz-animation:    fadeInUp .4s;
  -o-animation:      fadeInUp .4s;
  animation:         fadeInUp .4s;
}
.fadeOutUp {
  -webkit-animation: fadeOutUp .4s;
  -moz-animation:    fadeOutUp .4s;
  -o-animation:      fadeOutUp .4s;
  animation:         fadeOutUp .4s;
}
.fadeInRight {
  -webkit-animation: fadeInRight .2s;
  -moz-animation:    fadeInRight .2s;
  -o-animation:      fadeInRight .2s;
  animation:         fadeInRight .2s;
}
.fadeOutRight {
  -webkit-animation: fadeOutRight .3s;
  -moz-animation:    fadeOutRight .3s;
  -o-animation:      fadeOutRight .3s;
  animation:         fadeOutRight .3s;
}
*:focus {
  outline: none;
}
body {
  margin: 0px;
  width: 100%;
  background-color: #323F57;
  overflow: hidden;
}
a {
  color: #8c8c91;
  text-decoration: none;
}
a:hover
{
  color: inherit;
  text-decoration:none;
  cursor:pointer;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
}
.app {
  display: grid;
  grid-template-columns: 46px auto;
  grid-template-areas: '. content';
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.floatingActionBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 45px;
  height: 45px;
  background: linear-gradient(90deg, #c33460, #9a189c);
  border-radius: 50%;
  box-shadow: 3px 3px 18px 0px rgba(0,0,0,0.75);
  z-index: 0;
}
.floatingActionBtn:hover {
  cursor: pointer;
  background: linear-gradient(180deg, #c33460, #9a189c);
  box-shadow: 3px 3px 18px 1px rgba(0,0,0,0.75);
}
.floatingActionBtn:hover > .plus {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.4s;
}
.plus {
  color: white;
  opacity: .7;
}
@media only screen and (min-width: 720px) {
  .app {
    grid-template-columns: 46px minmax(304px, max-content) auto;
    grid-template-areas: '. content helper';
  }
}
</style>
