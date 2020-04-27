<template>
  <header>
    <div class="navbar-content">
      <router-link class="navbar-title" to="/">TimeKeepers</router-link>
      <router-link v-if="auth.isAuthenticated" to="/dashboard">Dashboard</router-link>
      <router-link v-if="auth.isAuthenticated" to="/management">Management</router-link>
      <router-link v-if="auth.isAuthenticated" to="/accounting">Accounting</router-link>
      <router-link v-if="auth.isAuthenticated" to="/expenses">Expenses</router-link>
      <router-link v-if="auth.isAuthenticated" to="/calendar">Calendar</router-link>
      <div v-if="auth.isAuthenticated" class="spacer"></div>
      <div v-if="auth.isAuthenticated" class="logout-button" @click="logout">Logout</div>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      auth: state => state.auth
    })
  },

  methods: {
    ...mapMutations(['setAuthentication']),
    ...mapActions(['resetState']),
    logout() {
      this.$cookies.remove('authToken')
      this.setAuthentication(false)
      this.resetState()
      this.$router.push({name: 'Home' })
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    height: 64px;
    background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    contain: layout;
    display: block;
    flex: 1 1 auto;
    max-width: 100%;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) transform, 0.2s cubic-bezier(0.4, 0, 0.2, 1) background-color, 0.2s cubic-bezier(0.4, 0, 0.2, 1) left, 0.2s cubic-bezier(0.4, 0, 0.2, 1) right, 280ms cubic-bezier(0.4, 0, 0.2, 1) box-shadow, 0.25s cubic-bezier(0.4, 0, 0.2, 1) max-width, 0.25s cubic-bezier(0.4, 0, 0.2, 1) width;
  }

  .navbar-content {
    align-items: baseline;
    display: flex;
    padding: 17px 16px;
    position: relative;
    z-index: 0;
  }

  .navbar-title {
    color: #42b983;
    font-size: 1.25rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a, .logout-button {
    align-content: bottom;
    color: #2c3e50;
    font-weight: bold;
    padding: 0 15px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }

    &:hover {
      color: purple
    }
  }

  .logout-button:hover {
    cursor: pointer;
    color: red
  }

  .spacer {
    flex-grow: 1 !important;
  }
</style>
