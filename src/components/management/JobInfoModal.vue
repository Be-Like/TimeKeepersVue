<template>
  <div>
    <div class="modal-overlay" />
    <div class="modal">
      <form class="modal-dialog" @submit.prevent="saveJob">
        <!-- Title -->
        <div class="modal-title">
          <p>Add Job</p>
        </div>
        <!-- Body -->
        <div class="modal-body">
          <div class="form-group">
            <label>Job Information</label>
            <input
              class="form-control"
              v-model="formData.company"
              type="text"
              placeholder="Company"
            >
            <input
              class="form-control"
              v-model="formData.jobTitle"
              type="text"
              placeholder="Job Title"
            >
            <input
              class="form-control"
              v-model="formData.pay"
              type="number"
              placeholder="Pay/Pay Rate"
            >
            <input
              class="form-control"
              v-model="formData.payPeriod"
              type="text"
              placeholder="Pay Period"
            >
          </div>
          <div class="form-group">
            <label>Address</label>
            <input
              class="form-control"
              v-model="formData.street"
              type="text"
              placeholder="Street Address"
            >
            <input
              class="form-control"
              v-model="formData.city"
              type="text"
              placeholder="City"
            >
            <input
              class="form-control"
              v-model="formData.state"
              type="text"
              placeholder="State"
            >
            <input
              class="form-control"
              v-model="formData.country"
              type="text"
              placeholder="Country"
            >
            <input
              class="form-control"
              v-model="formData.zipcode"
              type="text"
              placeholder="Zip Code"
            >
          </div>
          <div class="form-group">
            <label>Contact Information</label>
            <input
              class="form-control"
              v-model="formData.phone"
              type="text"
              placeholder="Phone Number"
            >
            <input
              class="form-control"
              v-model="formData.email"
              type="text"
              placeholder="Email"
            >
            <input
              class="form-control"
              v-model="formData.website"
              type="text"
              placeholder="Website"
            >
          </div>
          <div class="form-group">
            <label>Taxes and Withholdings</label>
            <input
              class="form-control"
              v-model="formData.federalIncomeTax"
              type="text"
              placeholder="Federal Income Tax"
            >
            <input
              class="form-control"
              v-model="formData.stateIncomeTax"
              type="text"
              placeholder="State Income Tax"
            >
            <input
              class="form-control"
              v-model="formData.socialSecurity"
              type="text"
              placeholder="Social Security"
            >
            <input
              class="form-control"
              v-model="formData.medicare"
              type="text"
              placeholder="Medicare"
            >
            <input
              class="form-control"
              v-model="formData.retirement"
              type="text"
              placeholder="Individual Retirement"
            >
            <input
              class="form-control"
              v-model="formData.otherWithholdings"
              type="text"
              placeholder="Other Withholdings"
            >
          </div>
        </div>
        <!-- Actions -->
        <div class="modal-actions">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="setShowJobModal(false)"
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { addJob } from '../../REST/job'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      formData: {
        company: '',
        jobTitle: '',
        pay: '',
        payPeriod: null,
        street: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        phone: '',
        email: '',
        website: '',
        federalIncomeTax: null,
        stateIncomeTax: null,
        socialSecurity: null,
        medicare: null,
        retirement: null,
        otherWithholdings: null
      }
    }
  },

  methods: {
    ...mapMutations(['setShowJobModal']),
    async saveJob() {
      const res = await addJob(this.formData)
      console.log('Add Job Res:', res)
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-title {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  }
</style>
