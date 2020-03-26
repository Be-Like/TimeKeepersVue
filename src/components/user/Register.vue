<template>
  <div class="register-container">
    <div class="background-image">
      <div class="background-overlay"/>
    </div>
    <form @submit.prevent="">
      <h2>Hello Register</h2>
    </form>
  </div>
</template>

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
</style>
