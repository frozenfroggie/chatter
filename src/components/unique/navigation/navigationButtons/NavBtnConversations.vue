<template>
  <router-link
    :class="['conversations', {'router-link-active': isActive}]" exact
    :to="{ name: 'chat' }"
    tag='div'>
    <icon name="comments" scale="1.7"></icon>
  </router-link>
</template>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.friendName) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    }
  }
}
</script>

<style scoped>
.conversations {
  grid-area: conversations;
  align-self: center;
  justify-self: center;
  width: 100%;
  padding: 10px 0px;
  color: white;
  opacity: .4;
}
.conversations:hover {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.4s;
}
.router-link-active {
  border-left: 3px solid rgb(66, 183, 42);
  opacity: 1;
}
</style>
