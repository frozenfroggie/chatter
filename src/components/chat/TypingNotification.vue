<template>
  <li class="message">
    <div class='avatarContainer'>
      <icon name="user-circle" class='avatar' scale="3"/>
    </div>
    <div :class='["content", "contentLeft"]'>
      <span>Typing...</span>
    </div>
  </li>
</template>

<script>
export default {
  data () {
    return {
      text: null
    }
  },
  mounted () {
    this.$emit('mounted')
  },
  beforeDestroy () {
    this.$emit('unmounted')
  }
}
</script>

<style scoped>
li:last-child {
  padding-bottom: 20px;
}
.message {
  display: grid;
  grid-template-columns: 0px 40px 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 15px;
  align-items: start;
  grid-template-areas:
    ". avatar content content"
    ". avatar timestamp .";
  margin-top: 10px;
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
  word-break: break-all;
  width: 90%;
  grid-area: content;
  border-radius: 9px;
  font-size: 0.8em;
  padding: 5px 4px 10px 6px;
  margin: 10px 5px;
  background-color: #e9ebee;
  opacity: .8;
  color: black;
  z-index: 1;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.5); */
}
@media only screen and (min-width: 720px) {
  .content {
    width: 70%;
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
.content:before {
  content: '';
  display: block;
  position: relative;
  top: 5px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background-color: #e9ebee;
  z-index: -1;
}
.contentLeft:before {
  left: -10px;
}
</style>
