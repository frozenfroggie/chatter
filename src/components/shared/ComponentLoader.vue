<template>
  <div>
    <icon name="spinner" scale="1.7" pulse :style="{color: color}"></icon>
  </div>
</template>

<script>
export default {
  props: ['color']
}
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 25px;
  width: 100%;
  height: 50vh;
}
</style>
