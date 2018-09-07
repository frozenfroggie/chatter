<template>
  <div class='resizer'
    @mousedown='handleMouseDown'
    @mouseup='handleMouseUp'
    @mousemove='handleMouseMove'>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['handleMouseUp', 'handleMouseDown', 'handleMouseMove'])
  },
  computed: {
    isDragged () {
      return this.$store.getters.isDragged
    }
  }
}
</script>

<style scoped>
.resizer {
  display: none;
  position: absolute;
  left: -1px;
  top: 0px;
  height: 100%;
  width: 5px;
  background-color: transparent;
  z-index: 100;
}
@media only screen and (min-width: 720px) {
  .resizer {
    display: block;
  }
}
.resizer:hover, .resizer:active {
  cursor: e-resize;
}
</style>
