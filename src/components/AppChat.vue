<template>
  <div class="chat">
    <profile-panel :name='name'/>
    <messages-list :messages='messages'/>
  </div>
</template>

<script>
import ProfilePanel from './chat/ProfilePanel.vue'
import MessagesList from './chat/MessagesList.vue'

export default {
  data () {
    return {
      name: 'Christianna Lynn',
      messages: [{
        from: 'me',
        content: 'Hi, whats goin on? I have terrible time in Sweden. Heva you been there? I will send you some photos leter. Text me if you have time',
        timestamp: '30 JANUARY 17:30'
      }, {
        from: 'Christianna Lynn',
        content: 'Lorem ipsum dolor sit amet, sed odio voluptaria eu. Tollit populo definiebas cum ut, eos graece causae cu. Convenire prodesset argumentum vix ut, ne mel mutat noster. Eam at veri facilisi menandri.',
        timestamp: '30 FEBRUARY 12:30'
      }, {
        from: 'Christianna Lynn',
        content: 'Pri ut nusquam democritum, homero facilisi duo ex. Erroribus sententiae et usu, graecis appetere consulatu no pri, ea vix omnes dolorum. Pro at mundi theophrastus, eu latine debitis sea, quem fierent vis eu. Eu sed vivendo assentior, est veri ornatus legimus ut.',
        timestamp: '5 APRIL 14:18'
      }, {
        from: 'Christianna Lynn',
        content: 'Pri ut nusquam democritum, homero facilisi duo ex. Erroribus sententiae et usu, graecis appetere consulatu no pri, ea vix omnes dolorum. Pro at mundi theophrastus, eu latine debitis sea, quem fierent vis eu. Eu sed vivendo assentior, est veri ornatus legimus ut.',
        timestamp: '5 APRIL 14:18'
      }]
    }
  },
  components: {
    ProfilePanel,
    MessagesList
  }
}
</script>

<style scoped>
.chat {
  grid-area: content;
}
@media only screen and (min-width: 720px) {
  .chat {
    grid-area: helper;
  }
}
</style>
