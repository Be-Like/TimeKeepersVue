<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-4 dashboard-left height-nav">
        <h3>Sup bro</h3>
      </div>
      <div class="col-4 dashboard-center height-nav">
        <JobEntries />
      </div>
      <div class="col-4 dashboard-right height-nav">
        <h3>Sup bro</h3>
      </div>
    </div>
    <!-- Modals -->
    <router-view></router-view>
  </div>
</template>

<script>
import JobEntries from '../components/dashboard/JobEntries'
import { mapState } from 'vuex'

export default {
  components: {
    JobEntries,
  },

  computed: {
    ...mapState('jobEntries', {
      entry: state => state
    })
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    margin: 0 10%;
    overflow: hidden;
  }

  .height-nav {
    height: calc(100vh - 64px);
  }
</style>
