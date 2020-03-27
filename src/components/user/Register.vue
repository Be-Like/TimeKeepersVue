<template>
  <div class="register-container">
    <div class="background-image">
      <div class="background-overlay"/>
    </div>
    <form @submit.prevent="register">
      <h2>TimeKeepers Sign Up</h2>
      <div class="form-group">
        <input
          class="form-control"
          v-model="name"
          type="text"
          placeholder="Name"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control"
          v-model="email"
          type="email"
          placeholder="Email Address"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control"
          v-model="password"
          type="password"
          placeholder="Password"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        >
      </div>
      <p class='login-prompt'>
        Already have an account? <router-link to='/'>Sign In</router-link>
      </p>
      <button type="submit" class="btn btn-outline-primary">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { register } from '../../REST/authentication'
import setAuthToken from '../../REST/setAuthToken'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },

// TODO: Reinstate this once logout fuctionality is complete
  // mounted() {
  //   if (this.$store.state.auth.isAuthenticated) {
  //     this.$router.push({ name: 'Dashboard' })
  //   }
  // },

  methods: {
    ...mapMutations(['setAuthentication']),
    async register() {
      const name = this.name
      const email = this.email
      const password = this.password
      const confirmPassword = this.confirmPassword
      if(password !== confirmPassword) {
        alert("Passwords do not match.")
      } else {
        const res = await register({ name, email, password })
        if (res.errors) {
          console.log('Errors reported', res.errors)
          return
        }
        this.$cookies.set('authToken', res.token)
        setAuthToken(res.token)
        this.setAuthentication(this.$cookies.isKey('authToken'))
        this.$router.push({ name: 'Dashboard' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .register-container {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .background-image {
    background: url("../../assets/timekeepers-background.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    .background-overlay {
      background: black;
      opacity: 0.8;
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }

  form {
    position: absolute;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    width: 30%;
  }

  .login-prompt {
    float: left;
  }
  a {
    color: #007bff;
  }

  .btn {
    float: right;
  }
</style>
