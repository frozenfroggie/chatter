<template>
  <div class="inputContainer">
    <div class="username">
      <icon name="user" scale="1"></icon>
      <input
        type="text"
        name="username"
        placeholder="Username"
        aria-label="Username"
        v-model="username">
    </div>
    <div class="password">
      <icon name="unlock" scale="1"></icon>
      <input
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Password"
        v-model="password">
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>
.inputContainer {
  grid-area: loginInput;
  background-color: rgb(38, 49, 66);
}
.username {
  height: 50%;
  border-top: 1px solid rgba(250,250,250,0.5);
}
.password {
  height: 50%;
  border-top: 1px solid rgba(250,250,250,0.5);
  border-bottom: 1px solid rgba(250,250,250,0.5);
}
input {
  height: 100%;
  width: 80%;
  padding-left: 10px;
  background-color: inherit;
  border: none;
  color: rgba(250,250,250,0.9);
}
@media only screen and (min-width: 768px) {
  .inputContainer {
    border-radius: 10px;
  }
  .username {
    border-radius: 10px 10px 0px 0px;
  }
  .password {
    border-radius: 0px 0px 10px 10px;
  }
}
</style>
