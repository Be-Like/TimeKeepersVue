<template>
  <div class="register-container">
    <div class="background-image">
      <div class="background-overlay"/>
    </div>
    <form @submit.prevent="register">
      <h2>Hello Register</h2>
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
import axios from 'axios'
// import { register } from '../../REST/authentication'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },

  methods: {
    register() {
      console.log(this.$data)
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      axios.post('/api/register', formData, config)
      // register({ name, email, password })
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
