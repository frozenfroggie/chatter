import Vue from 'vue'

export const eventBus = new Vue({
  methods: {
    percentScroll (conversationId, percent) {
      setTimeout(() => {
        const messagesList = document.getElementById('messagesList' + conversationId)
        if (messagesList) {
          const scrollHeight = messagesList.scrollHeight
          messagesList.scrollTop = scrollHeight * percent / 100
        }
      }, 1) // not sure why its necessary
    }
  }
})
