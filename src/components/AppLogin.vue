<template>
  <div class="login">

    <the-logo />

    <div class='loginHeader'> Login to your account </div>

    <the-login-form />

    <button type="button" name="" class='loginBtn' @click='$emit("login")'>LOG IN</button>

    <div class="forgotPassword"> Forgot password? </div>

    <div class='signup' @click='$router.push("/signup")'>
      Don't have an account? <span> Sign up </span>
    </div>

  </div>
</template>

<script>
import TheLogo from './unique/TheLogo.vue'
import TheLoginForm from './unique/forms/TheLoginForm.vue'

export default {
  components: {
    TheLogo,
    TheLoginForm
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
  grid-template-rows: 1fr 120px 50px 50px 50px 80px 2fr 50px;
  grid-template-areas:
    ' . . '
    ' logoContainer logoContainer'
    ' loginHeader loginHeader '
    ' loginInput loginInput'
    ' loginInput loginInput'
    ' loginBtn forgotPassword'
    ' . . '
    ' signup signup ';
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
.forgotPassword {
  width: 100%;
  height: 100%;
  grid-area: forgotPassword;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  font-size: .7em;
  color: rgba(250,250,250,0.5);
  text-decoration: underline;
}
.forgotPassword:hover {
  cursor: pointer;
}
.signup {
  grid-area: signup;
  font-size: .85em;
}
.signup > span {
  font-weight: 600;
}
.signup > span:hover {
  cursor: pointer;
}
@media only screen and (min-width: 768px) {
  .login {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 120px 50px 50px 50px 80px 2fr 50px;
    grid-template-areas:
      ' . . . . '
      ' . logoContainer logoContainer .'
      ' . loginHeader loginHeader . '
      ' . loginInput loginInput . '
      ' . loginInput loginInput . '
      ' . loginBtn forgotPassword . '
      ' . . . . '
      ' . signup signup .';
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
