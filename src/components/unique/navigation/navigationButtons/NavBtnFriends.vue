<template>
  <router-link to='/friends' tag='div' class='friends' exact>
    <icon name="users" scale="1.7"></icon>
  </router-link>
</template>

<script>
</script>

<style scoped>
.friends {
  grid-area: friends;
  align-self: center;
  justify-self: center;
  width: 100%;
  padding: 10px 0px;
  color: white;
  opacity: .4;
}
.friends:hover {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.4s;
}
.router-link-active {
  border-left: 4px solid #9a189c;
  opacity: 1;
}
</style>
