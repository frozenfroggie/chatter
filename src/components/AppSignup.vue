<template>
  <div class="login">

    <the-logo />

    <div class='loginHeader'> Create your account </div>

    <the-signup-form />

    <button type="button" name="" class='loginBtn' @click="signup">
      <icon v-if="!success && !error && pending" name="spinner" scale="1.7" pulse :style="{color: color}"></icon>
      <icon v-else-if="success && !error && !pending" name="check" scale="1.7" :style="{color: color}"></icon>
      <span v-else> SIGN UP </span>
    </button>

    <div class="errorMessage" v-if="error && errorMessage !== ''">
      {{ errorMessage }}
    </div>

    <div class='signin' @click='$router.push("/")'> Already have an account? <span> Sign in </span> </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheLogo from './unique/TheLogo.vue'
import TheSignupForm from './unique/forms/TheSignupForm.vue'

export default {
  components: {
    TheLogo,
    TheSignupForm
  },
  computed: {
    pending () {
      return this.$store.getters.signupRequest.pending
    },
    error () {
      return this.$store.getters.signupRequest.error
    },
    errorMessage () {
      return this.$store.getters.signupRequest.errorMessage
    },
    success () {
      return this.$store.getters.signupRequest.success
    }
  },
  methods: {
    ...mapActions(['signup'])
  }
}
</script>

<style scoped>
.login {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  color: rgba(250,250,250,0.9);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 100px 40px 200px 80px 50px 2fr 50px;
  grid-template-areas:
    ' . . '
    ' logoContainer logoContainer'
    ' loginHeader loginHeader '
    ' loginInput loginInput'
    ' loginBtn .'
    ' errorMessage errorMessage'
    ' . . '
    ' signin signin ';
}
.loginHeader {
  grid-area: loginHeader;
  text-align: left;
  padding-left: 10%;
}
.loginBtn {
  grid-area: loginBtn;
  margin: 1.2em 1em;
  width: 80%;
  color: rgba(250,250,250,0.9);
  background-color: rgb(38, 49, 66);
  border: 1px solid rgba(250,250,250,0.5);
  border-radius: 22px;
}
.loginBtn:hover {
  cursor: pointer;
}
.errorMessage {
  grid-area: errorMessage;
  color: #e74c3c;
}
.signin {
  grid-area: signin;
  font-size: .85em;
}
.signin > span {
  font-weight: 600;
}
.signin > span:hover {
  cursor: pointer;
}
@media only screen and (min-width: 768px) {
  .login {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 120px 50px 200px 80px 50px 2fr 50px;
    grid-template-areas:
      ' . . . . '
      ' . logoContainer logoContainer .'
      ' . loginHeader loginHeader . '
      ' . loginInput loginInput . '
      ' . loginBtn forgotPassword . '
      ' . errorMessage errorMessage .'
      ' . . . . '
      ' . signin signin .';
  }
}
@media only screen and (min-width: 1024px) {
  .login {
    grid-template-columns: 30% 1fr 1fr 30%;
  }
}
@media only screen and (min-width: 1280px) {
  .login {
    grid-template-columns: 32% 1fr 1fr 32%;
  }
}
</style>
