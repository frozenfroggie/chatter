<template>
  <div class='chatbox'>
    <div class="buttonsLeft">
      <icon scale="1.3" class="camera" name="camera" @click.native="handlePhoto"></icon>
      <icon scale="1.3" class="video" name="video" @click.native="videoChatCall"></icon>
      <input type="file" id="fileElem" multiple accept="image/*" style="display:none" @change="handleFiles">
      <label for="fileElem">
        <icon scale="1.3" class="paperclip" name="paperclip"></icon>
      </label>
      <icon scale="1.3" class="smile" name="smile" @click.native="showEmojiPanel"></icon>
      <picker class="emoji" set="emojione" v-show="emojiPanel" @select="addEmoji"/>
    </div>
    <div class='textareaContainer'>
      <text-area
        :message="messageText"
        @sendMessage="sendMessage"
        @updateEmojiMessage="updateEmojiMessage"/>
    </div>
    <div class="buttonsRight">
      <img class="arrow" src='../../assets/right-arrow.svg'
        @click="letSendMessage"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import adapter from 'webrtc-adapter'
import { Picker, Emoji } from 'emoji-mart-vue'
import { mapActions, mapGetters } from 'vuex'
import emojione from 'emojione'
import ss from 'socket.io-stream'
import TextArea from './TextArea'

// RTCPeerConnection Options
let server = {
  // Uses Google's STUN server
  iceServers: [{
    'urls': 'stun:stun.l.google.com:19302'
  }]
};

export default {
  data () {
    return {
      message: '',
      localVideo: null,
      remoteVideo: null,
      localStream: null,
      remoteStream: null,
      pc: null,
      offerOptions: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      },
      isInitiator: false,
      isStarted: false,
      turnReady: null,
      tracks: null
    }
  },
  components: {
    Picker,
    Emoji,
    TextArea
  },
  mounted () {
    this.localVideo = document.querySelector('#localVideo')
    this.remoteVideo = document.querySelector('#remoteVideo')
    if(this.socket) {
      this.socket.on('videoChatCall', () => {
        console.log('show video chat prompt')
        this.showVideoChatPrompt()
      })
      this.socket.on('videoChatAnswer', () => {
        console.log('START VIDEO CHAT')
        this.videoChatStart()
        this.gotLocalStream()
      })
      this.socket.on('videoChatDecline', () => {
        console.log('DECLINE!')
      })
      this.socket.on('videoChatSessionDescription', sessionDescription => {
        console.log('sessionDescription', sessionDescription)
        if (sessionDescription.type === 'offer') {
          console.log('offer')
          if (!this.isInitiator && !this.isStarted) {
            this.maybeStart()
          }
          this.pc.setRemoteDescription(new RTCSessionDescription(sessionDescription)).then(() => {
            this.doAnswer()
          }).catch(err => {
            console.log('setRemoteDescriptionErr', err)
          })
        } else if (sessionDescription.type === 'answer' && this.isStarted) {
          console.log('answer')
          this.pc.setRemoteDescription(new RTCSessionDescription(sessionDescription))
        }
      })
      this.socket.on('videoChatCandidate', message => {
        console.log('videoChatCandidate', message)
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        this.pc.addIceCandidate(candidate)
      })
      this.socket.on('videoChatHangup', () => {
        console.log('videoChatHangup')
        this.handleRemoteHangup()
        this.videoChatHangup()
      })
    }
  },
  computed: {
    ...mapGetters(['messageText', 'emojiPanel', 'socket', 'isVideoChatStarted', 'isVideoChatHangup']),
    conversationId () {
      return this.$route.params.conversationId
    }
  },
  methods: {
    ...mapActions(['videoChatStart', 'videoChatHangup', 'showVideoChatPrompt', 'hideVideoChatCalling', 'showVideoChatCalling', 'addEmojiMessage', 'removeMessage', 'setSendMessageIntention', 'openEmojiPanel', 'closeEmojiPanel']),
    showEmojiPanel (ev) {
      ev.stopPropagation()
      this.openEmojiPanel()
    },
    addEmoji (emo) {
      this.closeEmojiPanel()
      this.addEmojiMessage(emo.native)
    },
    updateEmojiMessage (emoji) {
      this.message += emoji
    },
    letSendMessage () {
      this.setSendMessageIntention(true)
    },
    sendMessage (localMessage) {
      this.$emit('sendMessage', localMessage)
    },
    handlePhoto (event) {
      alert(`Sorry, this feature isn't available right now`);
    },
    handleFiles (event) {
      // const file = event.target.files[0]
      // const stream = ss.createStream()
      // ss(this.socket).emit('file', stream, {size: file.size})
      // const blobStream = ss.createBlobReadStream(file)
      // let size = 0
      // blobStream.on('data', (chunk) => {
      //   size += chunk.length;
      //   console.log(Math.floor(size / file.size * 100) + '%');
      // });
      // blobStream.pipe(stream);
      alert(`Sorry, this feature isn't available right now`);
    },
    videoChatCall () {
      this.showVideoChatCalling()
      this.gotLocalStream()
      this.isInitiator = true
    },
    gotLocalStream () {
      return new Promise((resolve, reject) => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          console.log('WebRTC supported!')
          navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          }).then(stream => {
            console.log('Adding local stream.')
            this.tracks = stream.getTracks()
            this.localStream = stream
            this.localVideo.srcObject = stream
            if (this.isInitiator) {
              this.socket.emit('videoChatCall', this.conversationId)
            }
            resolve()
            // if (this.isInitiator) {
            //   this.maybeStart()
            // }
          }).catch(err => {
            console.log('Local stream err', err)
            if (this.isInitiator) {
              this.hideVideoChatCalling()
            }
            // if (this.isInitiator) {
            //   this.maybeStart()
            // }
            reject()
          })
        }
      })
    },
    maybeStart () {
      console.log('>>>>>>> maybeStart() ', this.isStarted, this.localStream)
      if (!this.isStarted && typeof this.localStream !== 'undefined') {
        console.log('>>>>>> creating peer connection', this.localStream)
        this.createPeerConnection()
        this.localStream && this.pc.addStream(this.localStream)
        this.isStarted = true
        console.log('isInitiator',this.isInitiator)
        if (this.isInitiator) {
          this.doCall()
        }
      }
    },
    createPeerConnection () {
      try {
        if (location.hostname === 'localhost') {
          server = null
        }
        this.pc = new RTCPeerConnection(server)
        this.pc.onicecandidate = this.handleIceCandidate
        this.pc.onaddstream = this.handleRemoteStreamAdded
        this.pc.onremovestream = this.handleRemoteStreamRemoved
        console.log('Created RTCPeerConnnection')
      } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message)
        alert('Cannot create RTCPeerConnection object.')
        return;
      }
    },
    handleIceCandidate (event) {
      console.log('icecandidate event: ', event)
      if (event.candidate) {
        this.socket.emit('videoChatCandidate', {
          conversationId: this.conversationId,
          payload: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate
          }
        })
      } else {
        console.log('End of candidates.')
      }
    },
    handleCreateOfferError (event) {
      console.log('createOffer() error: ', event)
    },
    doCall () {
      console.log('Sending offer to peer')
      this.pc.createOffer(this.setLocalAndSendMessage, this.handleCreateOfferError)
    },
    doAnswer () {
      console.log('Sending answer to peer.')
      this.pc.createAnswer().then(this.setLocalAndSendMessage).catch(this.onCreateSessionDescriptionError)
    },
    setLocalAndSendMessage (sessionDescription) {
      console.log('setLocalAndSendMessage sending message', sessionDescription)
      this.pc.setLocalDescription(sessionDescription)
      this.socket.emit('videoChatSessionDescription', {sessionDescription, conversationId: this.conversationId})
    },
    onCreateSessionDescriptionError (error) {
      console.log('Failed to create session description: ' + error.toString())
    },
    handleRemoteStreamAdded(event) {
      console.log('Remote stream added.');
      this.remoteStream = event.stream
      this.remoteVideo.srcObject = event.stream
    },
    handleRemoteStreamRemoved (event) {
      console.log('Remote stream removed. Event: ', event)
    },
    hangup () {
      console.log('Hanging up.')
      this.stop()
      this.socket.emit('videoChatHangup', this.conversationId)
    },
    handleRemoteHangup () {
      console.log('Session terminated.')
      this.stop()
    },
    stop () {
      this.tracks && this.tracks.forEach(track => {
        track.stop()
      })
      this.remoteStream = null
      this.localStream = null
      this.isInitiator = false
      this.isStarted = false
      this.pc && this.pc.close()
      this.pc = null
    }
  },
  watch: {
    isVideoChatStarted (isStarted) {
      if (isStarted) {
        this.gotLocalStream().then(() => {
          this.maybeStart()
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    isVideoChatHangup (hangup) {
      if (hangup) {
        this.hangup()
      }
    }
  }
}
</script>

<style scoped>
.chatbox {
  position: absolute;
  width: 100%;
  bottom: 0px;
  right: 0px;
  box-shadow: 2px 0px 20px -2px rgba(0,0,0,0.7);
  z-index: 10;
  display: flex;
  height: 50px;
  background-color: red;
}
.textareaContainer {
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 5px 10px 10px 10px;
}
.buttonsLeft {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  z-index: 100;
  padding: 0px 20px;
  background-color: white;
  z-index: 100;
  color: white;
}
.buttonsRight {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  z-index: 100;
  padding: 8px 20px;
  background-color: white;
  z-index: 100;
  color: white;
}
.arrow {
  height: 20px;
  width: 20px;
}
.arrow:hover {
  cursor: pointer;
}
.camera {
  padding: 0px;
  margin-right: 10px;
  color: rgba(0,0,0,0.3);
}
.camera:hover {
  cursor: pointer;
}
.paperclip {
  margin-right: 10px;
  color: rgba(0,0,0,0.3);
}
.video {
  margin-right: 10px;
  color: rgba(0,0,0,0.3);
}
.video:hover {
  cursor: pointer;
}
.smile {
  color: rgba(0,0,0,0.3);
}
.smile:hover {
  cursor: pointer;
}
.camera:hover {
  cursor: pointer;
}
.emoji {
  position: relative;
  top: -200px;
  left: 100px;
}
</style>
