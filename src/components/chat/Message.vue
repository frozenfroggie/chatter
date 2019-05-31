<template>
  <li :class='[message.author._id === user._id ? "messageFromMe" : "message", lastMessage && !shouldShowPrompt && !shouldShowCalling && "lastMessage"]'>
    <div v-if='timestampDiff > 900'
      :class='["timestamp", message.author._id === user._id ? "timestampRight" : "timestampLeft"]'>
      {{ message.createdAt | toData }}
    </div>
    <div v-if='lastMessage && !shouldShowPrompt && !shouldShowCalling' class='avatarContainer'>
      <icon name="user-circle" class='avatar' scale="3"/>
    </div>
    <div @mouseover="showTooltip" @mouseout="hideTooltip"
      :class='[message.source || message.options ? "content-img" :  "content", message.author._id === user._id ? "contentRight" : "contentLeft", !message.options && lastMessage && !shouldShowPrompt && !shouldShowCalling && "lastMessage"]'>
      <ul class="options" v-if="message.options && message.options.length > 0">
        <li class="option" @click="sendMessage(option.value.input.text)" v-for='option in message.options' :key="option.value.input.text">
          {{
            option.label
          }}
        </li>
      </ul>
      <img v-if="message.source" :src="message.source" width="450"/>
      <span v-if="message.messageText" v-html="text"></span>
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
  props: ['messageId', 'message', 'user', 'timestamp', 'lastMessage', 'shouldShowPrompt', 'shouldShowCalling'],
  data () {
    return {
      text: null,
      timestampDiff: null,
      shouldShowTooltip: false
    }
  },
  beforeMount () {
    console.log(this.message)
    // if (!this.message.source && (!this.message.options || !this.message.options.length > 0)) {
    this.text = emojione.unicodeToImage('<p>' + this.message.messageText + '</p>')
    // }
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
    },
    sendMessage (optionValue) {
      console.log(optionValue)
      this.$emit('sendMessage', optionValue)
    }
  }
}
</script>

<style scoped>
li:first-child {
  padding-top: 5px;
}
li:last-child {
  padding-bottom: 5px;
}
.message {
  display: grid;
  grid-template-columns: 10px 0px auto 30px 0px;
  grid-template-rows: auto;
  align-items: start;
  justify-items: start;
  grid-template-areas:
    "timestamp timestamp timestamp timestamp timestamp"
    ". avatar content tooltip ."
    ". avatar . . .";
}
.messageFromMe {
  display: grid;
  grid-template-columns: 0px 0px auto auto 10px;
  grid-template-rows: auto;
  align-items: center;
  justify-items: end;
  grid-template-areas:
    "timestamp timestamp timestamp timestamp timestamp"
    ". tooltip content content .";
}
.messageFromMe > .avatarContainer {
  display: none;
}
.options {
  padding: 0px;
}
.option {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  border: 1px solid #9a189c;
  margin: 5px 0px;
  border-radius: 5px;
  padding: 0px 5px !important;
  background-color: white;
  color: #9a189c;
  transition: all 0.2s;
}
.option:hover {
  cursor: pointer;
  background-color: #9a189c;
  color: white;
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
.content-img {
  position: relative;
  grid-area: content;
  border-radius: 9px;
  font-size: 0.8em;
  margin: 1.5px 5px;
  color: black;
  z-index: 1;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  user-select: text;
}
.content-img img {
  border-radius: 5px;
}
.content {
  position: relative;
  word-break: break-all;
  width: auto;
  max-width: 90%;
  grid-area: content;
  border-radius: 9px;
  font-size: 0.8em;
  padding: 0px 12px;
  margin: 1.5px 5px;
  background-color: #e9ebee;
  opacity: .8;
  color: black;
  z-index: 1;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  user-select: text;
}
@media only screen and (min-width: 720px) {
  .content {
    max-width: 70%;
  }
  .message {
    grid-template-columns: 10px 0px auto 30px 0px;
  }
  .messageFromMe {
    grid-template-columns: 0px 0px auto auto 10px;
  }
}
span {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.lastMessage {
  grid-template-columns: 0px 40px auto 30px 0px;
  grid-column-gap: 10px;
}
.lastMessage:before {
  content: '';
  display: block;
  position: relative;
  top: 5px;
  left: -14px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background-color: #e9ebee;
  z-index: -1;
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
