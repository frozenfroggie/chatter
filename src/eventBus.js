import Vue from 'vue'

export const eventBus = new Vue({
  methods: {
    percentScroll (percent) {
      const scrollHeight = document.getElementById('messagesList').scrollHeight
      document.getElementById('messagesList').scrollTop = scrollHeight * percent / 100
    }
  }
})
