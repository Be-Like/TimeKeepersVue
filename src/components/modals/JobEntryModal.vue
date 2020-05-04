<template>
  <div>
    <div class="modal-overlay">
      <div class="modal">
        <form class="modal-dialog" @submit.prevent="saveEntry">
          <!-- Title -->
          <div class="modal-title">
            <p>{{ jobEntry ? 'Edit' : 'Add' }} Job Entry</p>
          </div>
          <!-- Body -->
          <div class="modal-body">
            <div class="form-group">
              <label>Job</label>
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
                  {{ job.company}} - {{ job.jobTitle }}
                </option>
              </select>
              <div class="form-error" v-if="validations.job">Job is required</div>
            </div>
            <div class="form-group" @click="dismissWarnings">
              <div class="start-end-time">
                <label>Start Time</label>
                <date-picker
                  v-model="startTime"
                  class="date-picker"
                  type="datetime"
                  :show-second="false"
                  :confirm="true"
                  placeholder="Select start time"
                />
                <div class="form-error" v-if="validations.startTime">Start time is required</div>
                <div class="form-error" v-if="validations.endTimeAfterStart">Start time must be before start</div>
              </div>
              <div class="start-end-time">
                <label>End Time</label>
                <date-picker
                  v-model="endTime"
                  class="date-picker"
                  type="datetime"
                  :show-second="false"
                  :confirm="true"
                  :disabled-date="notBeforeStartDate"
                  :disabled-time="notBeforeStartTime"
                  placeholder="Select start time"
                />
                <div class="form-error" v-if="validations.endTime">End time is required</div>
                <div class="form-error" v-if="validations.endTimeAfterStart">End time must be after start</div>
              </div>
            </div>
            <div class="form-group">
              <div class="inline-icon">
                <label>Break Times</label>
                <i class="material-icons add-break-icon" @click="addBreak">add</i>
                <label v-if="validations.nullTimes"><small>Please add start and end time</small></label>
              </div>
              <div
                v-for="(time, index) in breakTimes"
                :key="index"
                class="break-times"
              >
                <div class="break-time-start">
                  <date-picker
                    v-model="time.startTime"
                    class="date-picker"
                    type="datetime"
                    :show-second="false"
                    :confirm="true"
                    :disabled-date="disableDates(startTime, endTime)"
                    :disabled-time="disableTimes(startTime, endTime)"
                    placeholder="Select start break time"
                  />
                </div>
                <div class="break-time-end">
                  <date-picker
                    v-model="time.endTime"
                    class="date-picker"
                    type="datetime"
                    :show-second="false"
                    :confirm="true"
                    :disabled-date="disableDates(breakTimes[index].startTime, endTime)"
                    :disabled-time="disableTimes(breakTimes[index].startTime, endTime)"
                    placeholder="Select end break time"
                  />
                  <i
                    class="material-icons delete-break-icon"
                    @click="removeBreak(index)"
                  >delete</i>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Notes</label>
              <div class="entry-notes">
                <textarea
                  class="form-control"
                  v-model="notes"
                  rows="3"
                  placeholder="Job entry notes"
                />
              </div>
            </div>
          </div>
          <!-- Actions -->
          <div class="modal-actions">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="closeModal"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  props: {
    jobEntry: {
      type: Object,
      default: null
    }
  },

  components: {
    DatePicker
  },

  data() {
    return {
      id: null,
      selectedJob: '',
      startTime: null,
      endTime: null,
      breakTimes: [],
      notes: '',
      isValid: false,
      validations: {
        job: null,
        startTime: null,
        endTime: null,
        endTimeAfterStart: null,
        nullTimes: false,
      }
    }
  },

  watch: {
    startTime() {
      if (this.endTime < this.startTime && this.endTime) {
        this.validations.endTimeAfterStart = true
      } else {
        this.validations.endTimeAfterStart = false
      }
    },
    endTime() {
      if (this.endTime < this.startTime) {
        this.validations.endTimeAfterStart = true
      } else {
        this.validations.endTimeAfterStart = false
      }
    }
  },

  computed: {
    ...mapState('management', {
      jobs: state => state.jobsArray
    }),
    ...mapGetters('management', ['getJobEntryInfo'])
  },

  mounted() {
    this.getJobs()

    if (this.jobEntry) {
      let breakTimeObjects = []
      this.jobEntry.breakTimes.forEach(time => {
        let start = new Date(time.startTime)
        let end = new Date(time.endTime)
        breakTimeObjects.push({ startTime: start, endTime: end })
      })

      this.id = this.jobEntry._id
      this.selectedJob = this.jobEntry.job
      this.startTime = new Date(this.jobEntry.startTime)
      this.endTime = new Date(this.jobEntry.endTime)
      this.breakTimes = breakTimeObjects
      this.notes = this.jobEntry.notes
    }
  },

  methods: {
    ...mapActions('jobEntries', ['addJobEntry', 'editJobEntry']),
    ...mapActions('management', ['getJobs']),
    notBeforeStartDate(date) {
      let start = new Date(this.startTime)
      return date < new Date(start.getTime() - 86399999) && start !== null
    },
    notBeforeStartTime(date) {
      return date < new Date(this.startTime)
    },
    disableDates(from, to) {
      return date => {
        return date > new Date(to + 86399999) || date < new Date(from - 86399999)
      }
    },
    disableTimes(from, to) {
      return date => {
        return date > to || date < from || this.test(date)
      }
    },
    test(date) {
      // let arr = []
      for (let i = 0; i < this.breakTimes.length; i++) {
        if (date > this.breakTimes[i].startTime && date < this.breakTimes[i].endTime) return true
        // return arr.some(true)
      }
    },
    dismissWarnings() {
      this.validations.nullTimes = false
    },
    addBreak() {
      if (!this.startTime || !this.endTime) {
        this.validations.nullTimes = true
        return
      }
      this.breakTimes.push({
        startTime: null,
        endTime: null
      })
    },
    removeBreak(index) {
      this.breakTimes.splice(index, 1)
    },
    closeModal() {
      this.$router.back()
    },
    saveEntry() {
      this.validateSubmission()
      if (!this.isValid) {
        return
      }

      let jobInfo = this.getJobEntryInfo(this.selectedJob)

      const formData = {
        _id: this.id,
        job: jobInfo.id,
        pay: jobInfo.pay,
        jobTitle: jobInfo.jobTitle,
        company: jobInfo.company,
        startTime: this.startTime,
        endTime: this.endTime,
        breakTimes: this.breakTimes,
        notes: this.notes.trim()
      }

      this.jobEntry ? this.editJobEntry(formData) : this.addJobEntry(formData)
      this.$router.back()
    },
    validateSubmission() {
      this.validations.job = this.selectedJob ? false : true
      this.validations.startTime = this.startTime ? false : true
      this.validations.endTime = this.endTime ? false : true

      if (
        !this.validations.job &&
        !this.validations.startTime &&
        !this.validations.endTime &&
        !this.validations.endTimeAfterStart
      ) {
        this.isValid = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .mx-calendar-content .cell.active {
    background-color: #42b983;
  }

  .modal-title {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  }

  select {
    margin: 0 10px;
    width: calc(100% - 20px);
  }

  label {
    font-size: 18px;
    padding: 0 10px;

    small {
      color: #ff0800;
    }
  }

  .start-end-time {
    display: inline-block;
    padding: 0 10px;
    width: calc(50% - 20px);

    label {
      margin: 0 -10px
    }
  }

  .date-picker {
    margin: 5px 0;
    width: 100%;
  }

  .add-break-icon {
    cursor: pointer;
    font-size: 20px;
    margin-left: 10px;
    text-align: left;

    &:hover {
      color: #42b983;
    }
  }

  .break-time-start {
    display: inline-flex;
    padding: 0 10px;
    width: calc(50% - 20px);
  }

  .break-time-end {
    display: inline-flex;
    padding: 0 10px;
    width: calc(50% - 20px);
  }

  .delete-break-icon {
    cursor: pointer;
    margin: auto 0px auto 10px;

    &:hover {
      color: #ff0800;
    }
  }

  .entry-notes {
    margin: 10px 10px;
    width: calc(100% - 20px);

    textarea {
      resize: vertical;
    }
  }

  .form-error {
    margin-top: 0;
  }

  button {
    margin-right: 10px;
  }
</style>
