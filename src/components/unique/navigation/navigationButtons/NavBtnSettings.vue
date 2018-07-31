<template>
  <router-link to='/settings' tag='div' class='settings' exact>
    <icon name="cog" scale="1.7"></icon>
  </router-link>
</template>

<script>
</script>

<style scoped>
.settings {
  grid-area: settings;
  align-self: center;
  justify-self: center;
  width: 100%;
  padding: 10px 0px;
  color: white;
  opacity: .4;
}
.settings:hover {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.4s;
}
.router-link-active {
  border-left: 3px solid #5082CD;
  opacity: 1;
}
</style>
