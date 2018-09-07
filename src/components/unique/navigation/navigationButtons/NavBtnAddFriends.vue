<template>
  <router-link to='/friends/add' tag='div' class='addFriends' exact>
    <icon name="user-plus" scale="1.7"></icon>
  </router-link>
</template>

<script>
</script>

<style scoped>
.addFriends {
  grid-area: addFriends;
  align-self: center;
  justify-self: center;
  width: 100%;
  padding: 10px 0px;
  height: 50%;
  color: white;
  opacity: .4;
}
.addFriends:hover {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.4s;
}
.router-link-active {
  border-left: 4px solid #9a189c;
  opacity: 1;
}
</style>
