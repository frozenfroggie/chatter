<template>
  <div class='logout' @click='$emit("logout")'>
    <icon name="sign-out-alt" scale="1.7"></icon>
  </div>
</template>

<script>
</script>

<style scoped>
.logout {
  grid-area: logout;
  align-self: end;
  justify-self: center;
  padding-bottom: 10px;
  color: white;
  opacity: .4;
}
.logout:hover {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.4s;
}
</style>
