<template>
  <div class="home">
    <div class="background-image">
      <div class="background-overlay"/>
    </div>
    <Login />
  </div>
</template>

<script>
import Login from '@/components/user/Login'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>


<style lang="scss" scoped>
  .home {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .background-image {
    background: url("../assets/timekeepers-background.jpg");
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
</style>
