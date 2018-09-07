<template>
  <div class='logoContainer'>
    <div class='logo'>
      <div class='logoInner'>
      </div>
    </div>
    <div class='logoText'>
      <h1> CHATTER </h1>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.logoContainer {
  grid-area: logoContainer;
  display: flex;
  transform: scale(0.5);
}
.logoText {
  color: rgba(250,250,250,0.9);
  background: -webkit-linear-gradient(45deg, #c33460, #9a189c);
  -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
  padding-left: 20px;
}
.logo {
  width: 70px;
  height: 70px;
  border: 6px solid rgba(250,250,250,0.9);
  border-top: 6px solid #c33460;
  border-left: 6px solid #c33460;
  border-bottom: 6px solid #9a189c;
  border-right: 6px solid #9a189c;
  border-radius: 50%;
}
.logo:after {
  display: block;
  content: '';
  position: absolute;
  left: 51px;
  top: 51px;
  width: 20px;
  height: 20px;
  background-color: #323F57;
  transform: skew(20deg,20deg);
}
.logo:before {
  display: block;
  content: '';
  position: absolute;
  left: 59px;
  top: 59px;
  width: 20px;
  height: 20px;
  background-color: #9a189c;
  transform: skew(20deg,20deg);
}
.logoInner {
  position: absolute;
  width: 34px;
  height: 34px;
  border: 5px solid rgba(250,250,250,0.9);
  border-top: 5px solid #c33460;
  border-right: 5px solid #c33460;
  border-left: 5px solid #9a189c;
  border-bottom: 5px solid #9a189c;
  border-radius: 50%;
  left: 20px;
  top: 18px;
  z-index: 1;
}
.logoInner:after {
  display: block;
  content: '';
  position: absolute;
  left: 1px;
  top: 18px;
  width: 14px;
  height: 14px;
  background-color: #323F57;
  transform: skew(-20deg,-20deg);
}
.logoInner:before {
  display: block;
  content: '';
  position: absolute;
  left: -5px;
  top: 25px;
  width: 13px;
  height: 13px;
  background-color: #9a189c;
  transform: skew(-20deg,-20deg);
}
</style>
