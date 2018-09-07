<template>
  <div id="ta-frame">
    <textarea
      @keypress.prevent.enter="sendMessage"
      :value="localMessage"
      @input="update"
      class="div"
      contentEditable="true">
    </textarea>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
import emojione from 'emojione'

export default {
  data () {
    return {
      localMessage: ''
    }
  },
  props: ['message'],
  // mounted () {
  //   console.log('mounted!')
  //   var div = document.querySelector('#ta-frame')
  //   var ta = document.querySelector('textarea')
  //   ta.addEventListener('keydown', autosize)
  //   function autosize () {
  //     setTimeout(function () {
  //       ta.style.height = 'height:0px'
  //       var height = Math.min(20 * 5, ta.scrollHeight)
  //       div.style.height = 'height:' + height + 'px'
  //       ta.style.height = 'height:' + height + 'px'
  //     }, 0)
  //   }
  // },
  computed: {
    ...mapGetters(['messageText', 'addEmoji', 'sendMessageSuccess', 'sendMessageIntention'])
  },
  methods: {
    ...mapActions(['updateMessage', 'setSendMessageIntention', 'socketCustomEvent']),
    update (event) {
      this.localMessage = event.target.value
      const output = emojione.unicodeToImage('<p>' + this.localMessage + '</p>')
      event.target.innerHTML = output
      throttle(() => {
        console.log('typing!')
        this.socketCustomEvent({
          eventName: 'typingNotification',
          data: this.$route.params.conversationId
        })
      }, 1000)()
    },
    sendMessage () {
      if (this.localMessage) {
        const preservedWhitespaces = this.localMessage.replace(/\s/g, '&nbsp;')
        this.$emit('sendMessage', preservedWhitespaces)
        this.localMessage = ''
      }
    }
  },
  watch: {
    addEmoji: function (emoji) {
    // var input = document.body.innerHTML;
      this.localMessage += emoji
    // document.getElementById('div').innerText += emoji
    // this.$emit('updateEmojiMessage', emoji)
    },
    sendMessageIntention: function (sendMessageIntention) {
      console.log(sendMessageIntention)
      if (sendMessageIntention) {
        this.sendMessage()
        this.setSendMessageIntention(false)
      }
    }
    // sendMessageSuccess: function (status) {
    //   if (status) {
    //     document.getElementById('div').innerText = ''
    //     this.localMessage = ''
    //   }
    // }
  }
}
</script>

<style scoped>
#ta-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 50px;
  overflow: hidden;
}
textarea {
  overflow: hidden;
  position: relative;
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin:  0;
  padding: 10px;
  border:  0;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  resize: none;
  overflow: hidden;
}
</style>
