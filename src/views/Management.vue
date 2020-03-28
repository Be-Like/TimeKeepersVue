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
    <!-- <div class="job-info-modal">
      <h3>This will be the popup modal</h3>
    </div> -->
  </div>
</template>

<script>
import JobList from '../components/management/JobList'
export default {
  components: {
    JobList
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
