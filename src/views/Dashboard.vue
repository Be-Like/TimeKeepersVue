<template>
  <div class="dashboard">
    <div class="row">
      <div class="dashboard-left height-nav">
        <PunchCard />
      </div>
      <div class="dashboard-center height-nav">
        <JobEntries />
      </div>
      <div class="dashboard-right height-nav">
        <Expenses
          :dashboardComponent="true"
         />
      </div>
    </div>
    <!-- Modals -->
    <router-view></router-view>
  </div>
</template>

<script>
import PunchCard from '../components/dashboard/PunchCard'
import JobEntries from '../components/dashboard/JobEntries'
import Expenses from '../components/expenses/ExpenseList'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    PunchCard,
    JobEntries,
    Expenses,
  },

  computed: {
    ...mapState('jobEntries', {
      entry: state => state
    })
  },

  created() {
    this.getJobs()
  },

  methods: {
    ...mapActions('management', ['getJobs'])
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    margin: 0 10%;
    overflow: hidden;
  }

  .dashboard-left,
  .dashboard-right {
    width: 32.33%;
  }

  .dashboard-center {
    margin: 0 1.5%;
    width: 32.33%;
  }

  .height-nav {
    height: calc(100vh - 64px);
  }
</style>
