<template>
  <div class='navigation'>
    <the-navigation-avatar/>
    <nav-btn-conversations/>
    <nav-btn-friends/>
    <nav-btn-add-friends/>
    <nav-btn-settings/>
    <nav-btn-logout v-on:logout='logout'/>
  </div>
</template>

<script>
import TheNavigationAvatar from './TheNavigationAvatar'
import NavBtnConversations from './navigationButtons/NavBtnConversations'
import NavBtnFriends from './navigationButtons/NavBtnFriends'
import NavBtnAddFriends from './navigationButtons/NavBtnAddFriends'
import NavBtnSettings from './navigationButtons/NavBtnSettings'
import NavBtnLogout from './navigationButtons/NavBtnLogout'

export default {
  components: {
    TheNavigationAvatar,
    NavBtnConversations,
    NavBtnFriends,
    NavBtnAddFriends,
    NavBtnSettings,
    NavBtnLogout
  },
  methods: {
    logout () {
      // window.localStorage.clear()
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .navigation {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    width: 46px;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 2fr 1fr 1fr 1fr 1fr 3fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-areas:
      "avatar"
      "conversations"
      "friends"
      "addFriends"
      "settings"
      "logout";
    background-color: #2A384A;
    z-index: 15;
    box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.7);
  }
</style>
