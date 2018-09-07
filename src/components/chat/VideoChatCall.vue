<template>
  <li class="message">
    <div class='avatarContainer'>
      <icon name="user-circle" class='avatar' scale="3"/>
    </div>
    <div :class='["content", "contentLeft"]'>
      <span> {{ name.charAt(0).toUpperCase() + name.slice(1) }} is calling... </span>
      <div class='allow'>
        <icon name="phone" scale="1.5" flip="horizontal" @click.native='videoChatAnswer'/>
      </div>
      <div class='deny'>
        <icon name="phone" scale="1.5" flip="horizontal" @click.native='videoChatAnswer'/>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['name'],
  methods: {
    videoChatAnswer () {
      this.$store.dispatch('videoChatAnswer', this.$route.params.conversationId)
    }
  }
}
</script>

<style scoped>
li:last-child {
  padding-bottom: 20px;
}
.message {
  display: grid;
  grid-template-columns: 0px 40px auto 30px 0px;
  grid-template-rows: auto;
  grid-column-gap: 15px;
  align-items: start;
  justify-items: start;
  grid-template-areas:
    ". timestamp timestamp . ."
    ". avatar content tooltip ."
    ". avatar . . .";
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
  color: #c1c3c9;
  opacity: .4;
}
.content {
  position: relative;
  word-break: break-all;
  width: auto;
  max-width: 90%;
  grid-area: content;
  border-radius: 9px;
  font-size: 0.8em;
  padding: 0px 9px;
  margin: 1px 5px;
  background-color: #e9ebee;
  opacity: .8;
  color: black;
  z-index: 1;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  user-select: text;
  /* box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.5); */
}
@media only screen and (min-width: 720px) {
  .content {
    max-width: 70%;
  }
  .messageFromMe {
    grid-template-columns: 5px 1fr 1fr 20px;
  }
}
span {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.content:before {
  content: '';
  display: block;
  position: relative;
  top: 5px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background-color: #e9ebee;
  z-index: -1;
}
.contentLeft:before {
  left: -12px;
}
.allow {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0px 5px 0px 10px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  color: white;
  background-color: green;
}
.allow:hover {
  cursor: pointer;
}
.deny {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 10px 2px 10px 2px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  color: white;
  background-color: red;
  transform: rotate(135deg);
}
.deny:hover {
  cursor: pointer;
}
</style>
