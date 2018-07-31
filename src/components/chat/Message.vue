<template>
  <li :class='message.author._id === user._id ? "messageFromMe" : "message"'>
    <div class='avatarContainer'>
      <icon name="user-circle" class='avatar' scale="3"/>
    </div>
    <div :class='["content", message.author._id === user._id ? "contentRight" : "contentLeft"]'>
      {{ message.messageText }}
    </div>
    <div :class='["timestamp", message.author._id === user._id ? "timestampRight" : "timestampLeft"]'>
      {{ message.createdAt | toData }}
    </div>
  </li>
</template>

<script>

export default {
  name: 'Message',
  props: ['message', 'user'],
  mounted () {
    this.$emit('mounted')
  }
}
</script>

<style scoped>
.message {
  display: grid;
  grid-template-columns: 5px 25px 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 15px;
  align-items: start;
  grid-template-areas:
    ". avatar content content"
    ". avatar timestamp .";
  margin-top: 10px;
}
.messageFromMe {
  display: grid;
  grid-template-columns: 5px 1fr 1fr 50px;
  grid-template-rows: auto;
  align-items: start;
  justify-items: end;
  grid-template-areas:
    ". content content"
    ". . timestamp";
  margin-top: 10px;
}
.messageFromMe > .avatarContainer {
  display: none;
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
  color: #353E59;
  opacity: .4;
}
.content {
  word-break: break-all;
  width: 70%;
  grid-area: content;
  border-radius: 9px;
  font-size: 0.75em;
  padding: 5px 4px 20px 6px;
  margin: 10px;
  background-color: white;
  opacity: .8;
  color: black;
  z-index: 1;
  text-align: left;
  box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.5);
}
.content:before {
  content: '';
  display: block;
  position: relative;
  top: 5px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background-color: white;
  z-index: -1;
}
.contentRight {
  color: white;
  background-color: #5082CD;
}
.contentLeft:before {
  left: -10px;
}
.contentRight:before {
  display: none;
}
.timestamp {
  grid-area: timestamp;
  position: relative;
  top: -5px;
  font-size: 0.6em;
  font-weight: 600;
  color: rgba(250,250,250,0.5);
}
.timestampLeft {
  justify-self: start;
  left: 20px;
}
.timestampRight {
  justify-self: end;
  right: 20px;
}
</style>
