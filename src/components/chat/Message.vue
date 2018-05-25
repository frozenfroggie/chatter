<template>
  <li :class='message.from === "me" ? "messageFromMe" : "message"'>
    <div class='avatarContainer'>
      <icon name="user-circle" class='avatar' scale="2.5" />
    </div>
    <div :class='["content", message.from === "me" ? "contentRight" : "contentLeft"]'>
      {{ message.content }}
    </div>
    <div :class='["timestamp", message.from === "me" ? "timestampRight" : "timestampLeft"]'>
      {{ message.timestamp }}
    </div>
  </li>
</template>

<script>

export default {
  name: 'Message',
  props: ['message']
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
  justify-items: start;
  grid-template-areas:
    ". content content avatar"
    ". . timestamp avatar";
  margin-top: 10px;
}
.avatarContainer {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  grid-area: avatar;
  justify-self: center;
}
.avatar {
  color: white;
  opacity: .4;
}
.content {
  grid-area: content;
  border: 1px solid white;
  border-radius: 9px;
  font-size: 0.75em;
  padding: 0px 4px 10px 4px;
  margin: 10px;
  background-color: white;
  opacity: .8;
  color: black;
  z-index: 1;
}
.content:before {
  content: '';
  display: block;
  position: relative;
  top: 5px;
  left: -7px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background-color: white;
  z-index: -1;
}
.contentLeft:before {
  left: -8px;
}
.contentRight:before {
  left: 98%;
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
