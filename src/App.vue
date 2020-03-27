<template>
  <div id="app">
    <Navbar id="nav"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/navigation/Navbar'
import setAuthToken from './REST/setAuthToken'
import { mapMutations } from 'vuex'

export default {
  components: {
    Navbar
  },

  created() {
    if (this.$cookies.isKey('authToken')) {
      setAuthToken(this.$cookies.get('authToken'))
      this.setAuthentication(true)
    }
  },

  methods: {
    ...mapMutations(['setAuthentication'])
  }
}
</script>

<style lang="scss">
@import './stylesheet/application.scss';
</style>
