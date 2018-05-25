<template>
  <li class='conversationLabel' @click='openChat'>
    <div class='avatarContainer'>
      <icon name="user-circle" class='avatar' scale="2.5"></icon>
      <div :class='{online: friend.isOnline}'></div>
    </div>
    <div class='content'>
      <div class='conversationName'>
        {{ friend.name }}
      </div>
    </div>
    <icon name="plus" class='plus'></icon>
  </li>
</template>

<script>
export default {
  props: ['friend'],
  methods: {
    openChat () {
      this.$router.push(this.conversation.name)
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
    ". avatar content add ."
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
.plus {
  color: white;
  opacity: .4;
  grid-area: add;
}
.plus:hover {
  transition: opacity .6s;
  opacity: .9;
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
</style>
