<template>
  <div class="job-list-container">
    <!-- Header with a button to add a new job -->
    <div class="row job-list-header">
      <div class="col-9">
        <h3>Job's List</h3>
      </div>
      <div class="col-3 actions">
        <router-link
          :to="{ name: 'addJob' }"
          tag="i"
          class="material-icons"
        >add</router-link>
      </div>
    </div>
    <!-- Content: Job List -->
    <div class="list-container">
      <div
        class="index-container"
        v-for="(job, index) in getJobsArray"
        :key="index"
        @click="setSelectedJob(job)"
      >
        <p class="job-list-name">{{job.company}}</p>
        <span class="horizontal-line" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  mounted() {
    this.getJobs()
  },

  computed: {
    ...mapGetters('management', ['getJobsArray'])
  },

  methods: {
    ...mapMutations('management', ['setSelectedJob']),
    ...mapActions('management', ['getJobs'])
  }
}
</script>

<style lang="scss" scoped>
  .job-list-container {
    border-right: 1px solid #ccc;
  }

  .job-list-header {
    align-items: center;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    padding: 10px 10px;
  }

  .list-container {
    height: calc(100vh - 143.44px);
    overflow: auto;
  }

  .index-container {
    display: grid;
  }

  .job-list-name {
    cursor: pointer;
    padding: 0 15px;
    width: calc(100% - 30px);
  }

  .horizontal-line {
    border-top: 1px solid #ccc;
    margin-bottom: 1px;
    display: block;
    width: 100%;
  }
</style>
