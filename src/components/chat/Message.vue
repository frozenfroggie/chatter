<template>
  <li :class='message.author._id === user._id ? "messageFromMe" : "message"'>
    <div v-if='timestampDiff > 900'
      :class='["timestamp", message.author._id === user._id ? "timestampRight" : "timestampLeft"]'>
      {{ message.createdAt | toData }}
    </div>
    <div v-if='lastMessage' class='avatarContainer'>
      <icon name="user-circle" class='avatar' scale="3"/>
    </div>
    <div @mouseover="showTooltip" @mouseout="hideTooltip"
      :class='["content", message.author._id === user._id ? "contentRight" : "contentLeft", lastMessage && "lastMessage"]'>
      <span v-html="text"></span>
      <div v-if="shouldShowTooltip"
        :class='["tooltip", message.author._id === user._id ? "tooltipLeft" : "tooltipRight"]'>
        {{ message.createdAt | toHour }}
      </div>
    </div>
  </li>
</template>

<script>
import emojione from 'emojione'
import moment from 'moment'

export default {
  name: 'Message',
  props: ['message', 'user', 'timestamp', 'lastMessage'],
  data () {
    return {
      text: null,
      timestampDiff: null,
      shouldShowTooltip: false
    }
  },
  beforeMount () {
    this.text = emojione.unicodeToImage('<p>' + this.message.messageText + '</p>')
  },
  mounted () {
    const prevTimestamp = moment(this.timestamp)
    const currTimestamp = moment(this.message.createdAt)
    this.timestampDiff = moment.duration(currTimestamp.diff(prevTimestamp)).as('seconds')
    this.$emit('mounted')
    const emojis = document.getElementsByClassName('emojione')
    for (let emoji of emojis) {
      emoji.style.height = '16px'
      emoji.style.width = 'auto'
      emoji.style.verticalAlign = 'text-bottom'
    }
  },
  methods: {
    showTooltip (e) {
      this.shouldShowTooltip = true
    },
    hideTooltip (e) {
      this.shouldShowTooltip = false
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
.messageFromMe {
  display: grid;
  grid-template-columns: 0px 0px auto auto 5px;
  grid-template-rows: auto;
  align-items: center;
  justify-items: end;
  grid-template-areas:
    ". . timestamp timestamp ."
    ". tooltip content content .";
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
.lastMessage:before {
  content: '';
  display: block;
  position: relative;
  top: 5px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background-color: #e9ebee;
  z-index: -1;
  left: -12px;
}
.contentRight {
  color: white;
  background: linear-gradient(90deg, #c33460, #9a189c);
}
.contentRight:before {
  display: none;
}
.timestamp {
  grid-area: timestamp;
  position: relative;
  top: -5px;
  font-size: 0.6em;
  font-weight: 700;
  color: rgba(0,0,0,0.4);
  padding: 20px;
}
.timestampLeft {
  justify-self: center;
}
.timestampRight {
  justify-self: center;
}
.tooltip {
  position: absolute;
  border: 1px solid black;
  border-radius: 3px;
  background-color: black;
  color: #fff;
  padding: 2px 5px;
}
.tooltipLeft {
  left: -50px;
}
.tooltipRight {
  right: -50px;
}
</style>
