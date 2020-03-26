<template>
  <div class="login-container">
    <h2 class="title-name">TimeKeepers</h2>
    <h4 class="subtitle">It's time to simplify your time.</h4>
    <form @submit.prevent="login">
      <div class="form-group">
      <input
        v-model="email"
        type="email"
        class='form-control'
        placeholder="Email Address"
      />
    </div>
    <div class="form-group">
      <input
        v-model="password"
        type="text"
        class='form-control'
        placeholder="Password"
      />
    </div>
    <p class="register-prompt">
      Don't have an account? <router-link to='/register'>Sign Up</router-link>
    </p>
    <button type="submit" class="btn btn-primary">
      Sign In
    </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login() {
      console.log(this.$data)
    }
  }
}
</script>

<style scoped>
  .login-container {
    align-items: center;
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
