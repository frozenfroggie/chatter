<template>
  <div class='searchPanelContainer'>
    <div class='searchPanel'>
      <input
        type='text'
        autofocus
        :placeholder="placeholder"
        @input="$emit('inputChange', $event.target.value)"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['placeholder']
}
</script>

<style scoped>
.searchPanelContainer {
  border-bottom: 1px solid rgba(250,250,250,0.1);
}
.searchPanel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
}
input {
  width: 100%;
  max-width: 300px;
  height: 50%;
  border: none;
  border-radius: 12px;
  background-color: rgb(38, 49, 66);
  color: white;
  margin: 15px;
  padding-left: 15px;
  font-size: .8em;
}
input::placeholder {
  color: rgba(250,250,250,0.5);
}
.plusContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(38, 49, 66);
}
.plus {
  color: #8c8c91;
}
.plus:hover {
  cursor: pointer;
  color: white;
}
</style>
