<template>
  <div class="calendar">
    <div class="row">
      <div class="left-side">
        <div class="calendar-view">
          <Calendar />
        </div>
        <div class="calendar-events">
          <Events />
        </div>
      </div>
      <div class="right-side">
        <JobEntryInfo />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Calendar from '../components/calendar/Calendar'
import Events from '../components/calendar/Events'
import JobEntryInfo from '../components/calendar/JobEntryInfo'
import { mapActions } from 'vuex'

export default {
  components: {
    Calendar,
    Events,
    JobEntryInfo
  },

  created() {
    this.getJobEntries()
  },

  methods: {
    ...mapActions('jobEntries', ['getJobEntries'])
  }
}
</script>

<style lang="scss" scoped>
  .calendar {
    height: calc(100vh - 70px);
    overflow: hidden;
  }

  .row {
    height: 100%;
  }

  .left-side {
    height: 100%;
    width: 50%;

    .calendar-view {
      height: 70%;
      padding-top: 5px;
    }

    .calendar-events {
      height: 30%;
      overflow: auto;
    }
  }

  .right-side {
    height: 100%;
    width: 50%;
  }
</style>
