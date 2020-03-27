<template>
  <div class="login-container">
    <h2 class="title-name">TimeKeepers</h2>
    <h4 class="subtitle">It's time to simplify your time.</h4>
    <form @submit.prevent="login">
      <div class="form-group">
      <input
        class='form-control'
        v-model="email"
        type="email"
        placeholder="Email Address"
      />
    </div>
    <div class="form-group">
      <input
        class='form-control'
        v-model="password"
        type="password"
        placeholder="Password"
      />
    </div>
    <p class="register-prompt">
      Don't have an account? <router-link to='/register'>Sign Up</router-link>
    </p>
    <button type="submit" class="btn btn-outline-primary">
      Sign In
    </button>
    </form>
  </div>
</template>

<script>
import { login } from '../../REST/authentication'
import setAuthToken from '../../REST/setAuthToken'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  mounted() {
    if (this.$store.state.auth.isAuthenticated) {
      this.$router.push({ name: 'Dashboard' })
    }
  },

  methods: {
    ...mapMutations(['setAuthentication']),
    async login() {
      const email = this.email
      const password = this.password

      const res = await login({ email, password })
      if (res.errors) {
        console.log('Login Error:', res.errors)
        return
      }

      this.$cookies.set('authToken', res.token)
      setAuthToken(res.token)
      this.setAuthentication(this.$cookies.isKey('authToken'))
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style scoped>
  .login-container {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    width: 30%;
  }

  .title-name {
    font-size: 40px;
  }

  .sub-title {
    font-size: 20px;
  }

  .register-prompt {
    float: left;
  }

  a {
    color: #007bff;
  }

  .btn {
    float: right;
  }
</style>
