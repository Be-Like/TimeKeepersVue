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
        :disabled="punchCard ? true : false"
        v-model="jobId"
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
        class="btn btn-success clock-in"
        @click="clockIn(jobId)"
      >
        Clock-In
      </button>
      <button
        v-if="punchCard"
        class="btn btn-danger"
        @click="clockOut"
      >
        Clock-Out
      </button>
      <button
        v-if="!onBreak && punchCard"
        class="btn btn-outline-warn"
        @click="beginBreak"
      >
        Start Break
      </button>
      <button
        v-else-if="onBreak && punchCard"
        class="btn btn-warn"
        @click="endBreak"
      >
        End Break
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('management', {
      jobs: state => state.jobsArray
    }),
    ...mapState('punchCard', {
      punchCard: state => state.punchCard,
      selectedJob: state => state.selectedJob,
    }),
    jobId: {
      get() {
        return this.selectedJob
      },
      set(value) {
        this.setSelectedJob(value)
      }
    },
    onBreak() {
      if (this.punchCard) {
        let breakTimes = this.punchCard.breakTimes
        let length = breakTimes.length
        if (length == 0) return false
        let endTime = length > 0 ?
          breakTimes[breakTimes.length - 1].endTime : null

        return endTime ? false : true
      }
      return false
    }
  },

  mounted() {
    this.getPunchCard()
  },

  methods: {
    ...mapMutations('punchCard', ['setSelectedJob']),
    ...mapActions('punchCard', [
      'getPunchCard',
      'clockIn',
      'clockOut',
      'beginBreak',
      'endBreak'
    ])
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

  .punch-card-body {
    padding: 10px 10px;

    select, .clock-in {
      width: 100%;
    }

    button:not(.clock-in) {
      width: calc(50% - 10px);

      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }
  }
</style>
