<template>
  <div class="job-entry-info-container" v-if="entry">
    <div class="job-entry-info-header row">
      <h3 class="col-10">
        {{ entry.company }} <small>{{ entry.jobTitle }}</small>
      </h3>
      <div class="col-2 icons">
        <i
          class="material-icons edit-icon"
          @click="setShowEditJobModal(true)"
        >
          edit
        </i>
        <i
          class="material-icons delete-icon"
          @click="deleteJobEntry(entry._id)"
        >
          delete_forever
        </i>
      </div>
    </div>
    <div class="job-entry-info-body">
      <p class="section-label">
        Compensation Information
      </p>
      <div class="compensation-info">
        <p><b>Pay:</b> ${{ entry.pay.toFixed(2) }}</p>
        <p><b>Hours Worked:</b> {{ entry.hoursWorked.toFixed(2) }} hrs</p>
      </div>
      <p class="section-label">
        Time Entries
      </p>
      <div class="clock-entries">
        <p><b>Start Time:</b> {{ dateTime(entry.startTime) }}</p>
        <p><b>End Time:</b> {{ dateTime(entry.endTime) }}</p>
        <div v-if="entry.breakTimes.length > 0">
          <p><b>Break Times:</b></p>
          <ul
            class="break-entry"
          >
            <li v-for="(time, index) in entry.breakTimes" :key="index">
              <p><b>Start:</b> {{ dateTime(time.startTime) }}</p>
              <p><b>End:</b> {{ dateTime(time.endTime) }}</p>
            </li>
          </ul>
        </div>
      </div>
      <p class="section-label">
        Note
      </p>
      <div class="note-entry">
        {{ entry.notes }}
      </div>
    </div>
  </div>
</template>

<script>
// TODO: delete entry, edit entry
import { formatDateTime } from '../../miscellaneous/format-dates'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('jobEntries', {
      entry: state => state.selectedJobEntry
    })
  },

  mounted() {
    console.log('Entry', this.entry)
  },

  methods: {
    ...mapActions('jobEntries', ['deleteJobEntry']),
    dateTime(date) {
      return formatDateTime(date)
    }
  }
}
</script>

<style lang="scss" scoped>
  .job-entry-info-container {
    padding: 0 30px;
  }

  .job-entry-info-header {
    align-items: center;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    margin: 0 -30px;
    padding: 10px 30px;

    h3 {
      letter-spacing: 4px;

      small {
        color: #484848;
        letter-spacing: 0;
      }
    }

    .icons {
      text-align: right;
    }

    .edit-icon {
      cursor: pointer;
      margin-right: 10px;

      &:hover {
        color: #42b983;
      }
    }

    .delete-icon {
      cursor: pointer;
      margin-left: 10px;

      &:hover {
        color: #ff0800;
      }
    }
  }

  .job-entry-info-body {
    height: calc(100vh - 143.44px);
    margin-right: -30px;
    overflow: auto;
    padding-left: 15px;
  }

  .section-label {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 0;
  }

  .compensation-info {
    width: 100%;

    p {
      display: inline-block;
      width: 50%;

      @media(max-width: 600px) {
        margin: 5px 0;
        width: 100%;
      }
    }
  }

  .clock-entries {
    width: 100%;

    p {
      display: inline-block;
      width: 50%;
    }

    ul {
      margin-block-start: 0;
    }
  }

  .note-entry {
    margin-top: 15px;
    width: 100%;
  }
</style>
