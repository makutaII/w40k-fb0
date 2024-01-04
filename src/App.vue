<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h3>текст после лого но перед компонетом хелловорлд</h3>
  <h4>ниже вывод из компонента хелло ворлд</h4>
  <HelloWorld msg="Запущен Vue.js "/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
