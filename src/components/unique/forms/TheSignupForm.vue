<template>
  <div class="inputContainer">
    <div :class="['username', {invalid: $v.username.$error && username !== ''}]">
      <icon name="user" scale="1"></icon>
      <input
        type="text"
        name="username"
        placeholder="Username"
        aria-label="Username"
        id="username"
        :value="username"
        @input="(event) => updateSignupForm(event, 'username')"
        @blur="$v.username.$touch()">
    </div>
    <div :class="['email', {invalid: $v.email.$error && email !== ''}]">
      <icon name="envelope" scale="1"></icon>
      <input
        type="email"
        name="email"
        placeholder="Email"
        aria-label="Email"
        id="email"
        :value="email"
        @input="(event) => updateSignupForm(event, 'email')"
        @blur="$v.email.$touch()">
    </div>
    <div :class="['password', {invalid: $v.password.$error && password !== ''}]">
      <icon name="unlock" scale="1"></icon>
      <input
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Password"
        id="password"
        :value="password"
        @input="(event) => updateSignupForm(event, 'password')"
        @blur='$v.password.$touch()'>
    </div>
    <div :class="['confirmPassword', {invalid: $v.confirmPassword.$error && confirmPassword !== ''}]">
      <icon name="unlock" scale="1"></icon>
      <input
        type="password"
        name="password"
        placeholder="Retype Password"
        aria-label="Retype password"
        id="confirmPassword"
        :value="confirmPassword"
        @input="(event) => updateSignupForm(event, 'confirmPassword')"
        @blur='$v.confirmPassword.$touch()'>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  computed: {
    username () {
      return this.$store.getters.signupForm.username
    },
    email () {
      return this.$store.getters.signupForm.email
    },
    password () {
      return this.$store.getters.signupForm.password
    },
    confirmPassword () {
      return this.$store.getters.signupForm.confirmPassword
    }
  },
  methods: {
    updateSignupForm (event, name) {
      this.$store.dispatch('updateSignupForm', {name, value: event.target.value})
    }
  },
  validations: {
    username: {
      required,
      minLen: minLength(5)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs('password')
    }
  }
}
</script>

<style scoped>
.inputContainer {
  grid-area: loginInput;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    ' username '
    ' email '
    ' password '
    ' confirmPassword ';
  background-color: rgb(38, 49, 66);
}
.email {
  grid-area: email;
  border-top: 1px solid rgba(250,250,250,0.5);
}
.username {
  grid-area: username;
  border-top: 1px solid rgba(250,250,250,0.5);
}
.password {
  grid-area: password;
  border-top: 1px solid rgba(250,250,250,0.5);
}
.confirmPassword {
  grid-area: confirmPassword;
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
.invalid input {
  color: #cb2431;
}
@media only screen and (min-width: 768px) {
  .inputContainer {
    border-radius: 10px;
  }
  .username {
    border-radius: 10px 10px 0px 0px;
  }
  .confirmPassword {
    border-radius: 0px 0px 10px 10px;
  }
}
</style>
