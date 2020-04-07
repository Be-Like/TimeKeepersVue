<template>
  <div>
    <!-- Header with a button to add a new job -->
    <div class="row job-list-header">
      <div class="col-9">
        <h3>Job's List</h3>
      </div>
      <div class="col-3 actions">
        <i class="material-icons" @click="setShowJobModal(true)">add</i>
      </div>
    </div>
    <!-- Content: Job List -->
    <div v-for="(job, index) in getJobsArray" :key="index">
      <p class="job-list-name">{{job.company}}</p>
      <span class="horizontal-line" />
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
    ...mapGetters(['getJobsArray'])
  },

  methods: {
    ...mapMutations(['setShowJobModal']),
    ...mapActions(['getJobs'])
  }
}
</script>

<style lang="scss" scoped>
  .job-list-header {
    align-items: center;
    // background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    padding: 10px 10px;

    .actions {
      text-align: right;

      i {
        cursor: pointer;

        &:hover {
          color: #42b983;
        }
      }
    }
  }

  .job-list-name {
    cursor: pointer;
    padding: 0 15px;
    width: 100%;
  }

  .horizontal-line {
    border-top: 1px solid #ccc;
    margin-bottom: 1px;
    display: block;
    width: 100%;
  }
</style>
