<template>
  <div class="login-container">
    <h2 class="title-name">TimeKeepers</h2>
    <h4 class="subtitle">It's time to simplify your time.</h4>
    <div class="form-group">
      <input
        type="email"
        class='form-control'
        placeholder="Email Address"
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        class='form-control'
        placeholder="Password"
      />
    </div>
  </div>
</template>

<script>
export default {

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
    width: 40%;
  }

  .title-name {
    font-size: 40px;
  }

  .sub-title {
    font-size: 20px;
  }

  input {
    max-width: 50%;
    margin: auto;
  }
</style>
