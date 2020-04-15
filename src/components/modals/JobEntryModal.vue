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
            <p>This will be the body: probably just one form group..?</p>
            <p>Start and End time</p>
            <date-picker
              v-model="startTime"
              type="datetime"
              :confirm="true"
              placeholder="Select start time"
            />
            <date-picker
              v-model="endTime"
              type="datetime"
              :confirm="true"
              placeholder="Select start time"
            />
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
import { mapMutations } from 'vuex'

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
      startTime: null,
      endTime: null,
    }
  },

  methods: {
    ...mapMutations('jobEntries', [
      'setShowAddEntryModal',
      'setShowEditEntryModal'
    ]),
    closeModal() {
      console.log('Start time', this.startTime)
      console.log('End time', this.endTime)
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
