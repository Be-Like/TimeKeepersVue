<template>
  <div class="management">
    <div class="row">
      <div class="col-3 job-list">
        <JobList />
      </div>
      <div class="col-9 job-info">
        <h2>This is the Management page</h2>
      </div>
    </div>
    <JobInfoModal v-if="management.showJobModal" />
  </div>
</template>

<script>
import JobList from '../components/management/JobList'
import JobInfoModal from '../components/management/JobInfoModal'
import { mapState } from 'vuex'

export default {
  components: {
    JobList,
    JobInfoModal
  },

  computed: {
    ...mapState({
      management: state => state.management
    })
  }
}
</script>

<style lang="scss" scoped>
  .job-list {
    height: calc(100vh - 64px);
  }

  .job-info {
  }
</style>
