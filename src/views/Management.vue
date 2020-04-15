<template>
  <div class="management">
    <div class="row">
      <div class="col-3 job-list">
        <JobList />
      </div>
      <div class="col-9 job-info">
        <JobInfo />
      </div>
    </div>
    <JobInfoModal v-if="management.showAddJobModal" />
    <JobInfoModal
      v-if="management.showEditJobModal"
      :job="management.selectedJob"
    />
  </div>
</template>

<script>
import JobList from '../components/management/JobList'
import JobInfoModal from '../components/modals/JobInfoModal'
import JobInfo from '../components/management/JobInfo'
import { mapState } from 'vuex'

export default {
  components: {
    JobList,
    JobInfoModal,
    JobInfo
  },

  computed: {
    ...mapState('management', {
      management: state => state
    })
  }
}
</script>

<style lang="scss" scoped>
  .management {
    overflow: hidden;
  }

  .job-list {
    height: calc(100vh - 64px);
  }

  .job-info {
    height: calc(100vh - 64px);
  }
</style>
