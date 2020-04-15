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
    <JobEntryModal v-if="entry.showAddEntryModal" />
    <JobEntryModal
      v-if="entry.showEditEntryModal"
      :jobEntry="entry.selectedJobEntry"
    />
  </div>
</template>

<script>
import JobEntries from '../components/dashboard/JobEntries'
import JobEntryModal from '../components/modals/JobEntryModal'
import { mapState } from 'vuex'

export default {
  components: {
    JobEntries,
    JobEntryModal
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
