<template>
  <div class="punch-card-container">
    <!-- Header -->
    <div class="row punch-card-header">
      <h3>Punch Card</h3>
    </div>
    <!-- Body -->
    <div class="punch-card-body">
      <select
        class="form-control"
        v-model="selectedJob"
      >
        <option value="">Select a job</option>
        <option
          v-for="job in jobs"
          :key="job._id"
          :value="job._id"
        >
          {{ job.company }} <small>{{ job.jobTitle }}</small>
        </option>
      </select>
      <button
        v-if="!punchCard"
        class="btn btn-primary"
        @click="clockIn(selectedJob)"
      >
        Clock-In
      </button>
      <button
        v-if="punchCard"
        class="btn"
        @click="clockOut"
      >
        Clock-Out
      </button>
      <!-- <button
        class="btn"
      >
        Start Break
      </button>
      <button
        class="btn"
      >
        End Break
      </button> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      selectedJob: ''
    }
  },

  computed: {
    ...mapState('management', {
      jobs: state => state.jobsArray
    }),
    ...mapState('punchCard', {
      punchCard: state => state.punchCard
    })
  },

  mounted() {
    this.getPunchCard()
  },

  methods: {
    ...mapActions('punchCard', ['getPunchCard', 'clockIn', 'clockOut'])
  }
}
</script>

<style lang="scss" scoped>
  .punch-card-container {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    height: 100%;
  }

  .punch-card-header {
    align-items: center;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    padding: 10px 10px;
  }
</style>
