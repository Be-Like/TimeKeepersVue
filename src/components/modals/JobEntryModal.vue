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
                  v-for="(job, index) in getCompanyAndJob"
                  :key="index"
                  :value="job.id"
                >
                  {{ job.company}} - {{ job.jobTitle }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <div class="start-end-time">
                <label>Start Time</label>
                <date-picker
                  v-model="startTime"
                  class="date-picker"
                  type="datetime"
                  :confirm="true"
                  placeholder="Select start time"
                />
              </div>
              <div class="start-end-time">
                <label>End Time</label>
                <date-picker
                  v-model="endTime"
                  class="date-picker"
                  type="datetime"
                  :confirm="true"
                  placeholder="Select start time"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="inline-icon">
                <label>Break Times</label>
                <i class="material-icons add-break-icon" @click="addBreak">add</i>
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
                    :confirm="true"
                    placeholder="Select start break time"
                  />
                </div>
                <div class="break-time-end">
                  <date-picker
                    v-model="time.endTime"
                    class="date-picker"
                    type="datetime"
                    :confirm="true"
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
              class="btn btn-outline-priary"
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
import { mapMutations, mapActions, mapGetters } from 'vuex'

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
      selectedJob: '',
      startTime: null,
      endTime: null,
      breakTimes: [],
      notes: ''
    }
  },

  computed: {
    ...mapGetters('management', ['getCompanyAndJob'])
  },

  mounted() {
    if (this.job) {
      console.log('We are editing this job entry', this.job.jobTitle)
    } else {
      // Get jobs (company and job title)
      console.log('Adding job entry')
      this.getJobs()
    }
  },

  methods: {
    ...mapMutations('jobEntries', [
      'setShowAddEntryModal',
      'setShowEditEntryModal'
    ]),
    ...mapActions('management', ['getJobs']),
    addBreak() {
      this.breakTimes.push({
        startTime: null,
        endTime: null
      })
    },
    removeBreak(index) {
      this.breakTimes.splice(index, 1)
    },
    closeModal() {
      this.breakTimes.forEach((time, i) => {
        console.log(`Break time ${i}: ${time.startTime} - ${time.endTime}`)
      })
      // this.jobEntry ?
      //   this.setShowEditEntryModal(false) :
      //   this.setShowAddEntryModal(false)
    },
    saveEntry() {
      console.log('Will save modal')
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-title {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  }

  select {
    padding: 0 10px;
    width: calc(100% - 20px);
  }

  label {
    font-size: 18px;
    padding: 0 10px;
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
    margin-top: 10px;
    padding: 0 10px;

    textarea {
      width: calc(100% - 5px);
    }
  }
</style>
