<template>
  <div class='searchPanelContainer'>
    <div class='searchPanel'>
      <div class='arrowLeftContainer' @click='$router.push("/")'>
        <icon name="arrow-right" class='arrowLeft'></icon>
      </div>
      <div class='profileName'>
        <div> {{ name && name.charAt(0).toUpperCase() + name.slice(1) }} </div>
        <div :class='{online: isOnline}'></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'isOnline']
}
</script>

<style scoped>
.searchPanelContainer {
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, .20);
  background: linear-gradient(90deg, #c33460, #9a189c);
  z-index: 12;
}
.searchPanel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
}
.profileName {
  display: flex;
  position: relative;
  top: 1px;
  color: white;
  font-weight: 500;
  font-size: 1.1em;
}
input {
  width: 65%;
  max-width: 300px;
  height: 50%;
  border: none;
  border-radius: 12px;
  background-color: rgb(38, 49, 66);
  color: white;
  margin: 15px;
  padding-left: 15px;
  font-size: .8em;
}
input::placeholder {
  color: rgba(250,250,250,0.5);
}
.arrowLeftContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 12px;
  margin-right: 10px;
}
.arrowLeft {
  color: white;
}
.arrowLeft:hover {
  cursor: pointer;
  opacity: 1;
}
.online {
  position: relative;
  top: -1px;
  left: 7px;
  align-self: center;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: rgb(66, 183, 42);
}
</style>
