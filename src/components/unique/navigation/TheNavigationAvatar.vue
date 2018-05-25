<template>
  <div class='avatarContainer'>
    <icon name="user-circle" class='avatar' scale="2.5"></icon>
    <div :class='{online: true}'></div>
  </div>
</template>

<script>
</script>

<style scoped>
.avatarContainer {
  position: relative;
  grid-area: avatar;
  justify-self: center;
  align-self: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  color: white;
  opacity: .4;
}
.online {
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 6px;
  width: 6px;
  border: 3px solid rgb(38, 49, 66);
  border-radius: 50%;
  background-color: rgb(66, 183, 42);
}
</style>
