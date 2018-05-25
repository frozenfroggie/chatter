<template>
  <div class="app">

    <transition
      enter-active-class='animated fadeInLeft'
      leave-active-class='animated fadeOutLeft'>
      <the-navigation v-if='loggedIn' v-on:logout='logout'/>
    </transition>

    <transition
      enter-active-class='animated fadeInUp'
      leave-active-class='animated fadeOutUp'>
      <router-view v-if='shouldShowConversations && loggedIn'/>
    </transition>

    <transition
      enter-active-class='animated fadeInRight'
      leave-active-class='animated fadeOutRight'>
      <router-view key='chat' v-if='shouldShowChat && loggedIn' name="chat" />
    </transition>

    <transition
      enter-active-class='animated fadeInUp'
      leave-active-class='animated fadeOutUp'
      mode='out-in'>
      <router-view name='login' v-if='!loggedIn' v-on:login='loggedIn = true'/>
    </transition>

    <transition
      enter-active-class='animated fadeInUp'
      leave-active-class='animated fadeOutUp'
      mode='out-in'>
      <router-view name='signup' v-if='!loggedIn' v-on:signup='loggedIn = true'/>
    </transition>

    <transition
      enter-active-class='animated fadeIn'
      leave-active-class='animated fadeOut'>
      <router-link to="friends" tag='div' class='floatingActionBtn' v-show='floatingActionBtn && loggedIn'>
        <icon name='plus' class='plus'></icon>
      </router-link>
    </transition>

  </div>
</template>

<script>
import TheNavigation from './components/unique/navigation/TheNavigation.vue'

export default {
  name: 'App',
  components: {
    TheNavigation
  },
  data () {
    return {
      floatingActionBtn: true,
      shouldShowConversations: true,
      shouldShowChat: false,
      loggedIn: false
    }
  },
  mounted () {
    if (window.innerWidth > 720) {
      this.shouldShowChat = true
    }
    window.addEventListener('resize', this.handleResizing)
  },
  methods: {
    handleResizing () {
      if (window.innerWidth > 720) {
        this.shouldShowChat = true
        this.shouldShowConversations = true
      } else if (this.shouldShowConversations && !this.$route.params.friendName) {
        this.shouldShowChat = false
      } else if (this.shouldShowChat) {
        this.shouldShowConversations = false
      }
    },
    logout () {
      this.loggedIn = false
      this.$router.push('/')
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      if (to.path === '/') {
        this.floatingActionBtn = true
        this.shouldShowChat = false
        this.shouldShowConversations = true
      } else {
        this.floatingActionBtn = false
      }
      if (to.params.friendName && window.innerWidth > 720) {
        this.shouldShowChat = true
        this.shouldShowConversations = true
      } else if (!to.params.friendName) {
        this.shouldShowConversations = true
      } else {
        this.shouldShowChat = true
        this.shouldShowConversations = false
      }
    }
  }
}
</script>

<style>
.fadeInUp {
  -webkit-animation: fadeInUp .5s; /* Safari 4+ */
  -moz-animation:    fadeInUp .5s; /* Fx 5+ */
  -o-animation:      fadeInUp .5s; /* Opera 12+ */
  animation:         fadeInUp .5s; /* IE 10+, Fx 29+ */
}
.fadeOutUp {
  -webkit-animation: fadeOutUp .5s; /* Safari 4+ */
  -moz-animation:    fadeOutUp .5s; /* Fx 5+ */
  -o-animation:      fadeOutUp .5s; /* Opera 12+ */
  animation:         fadeOutUp .5s; /* IE 10+, Fx 29+ */
}
*:focus {
  outline: none;
}
body {
  margin: 0px;
  width: 100%;
  background-color: rgb(46, 59, 79);
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
  grid-template-rows: calc(100% - 46px);
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
  background-color: rgb(38, 49, 66);
  border-radius: 50%;
  box-shadow: 3px 3px 18px 0px rgba(0,0,0,0.75);
}
.floatingActionBtn:hover {
  cursor: pointer;
  box-shadow: 3px 3px 18px 1px rgba(0,0,0,0.75);
}
.floatingActionBtn:hover > .plus {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.4s;
}
.plus {
  color: white;
  opacity: .4;
}
@media only screen and (min-width: 720px) {
  .app {
    grid-template-columns: 46px 1fr 1fr;
    grid-template-areas: '. content helper';
  }
}
</style>
