<template>
  <div id="app">
    <Navbar id="nav"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/navigation/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import './stylesheet/application.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background: #edfabe;
  text-align: left;
  width: 100%;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
