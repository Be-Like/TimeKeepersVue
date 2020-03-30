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
              type="text"
              placeholder="Company"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Job Title"
            >
            <input
              class="form-control"
              type="number"
              placeholder="Pay/Pay Rate"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Pay Period"
            >
          </div>
          <div class="form-group">
            <label>Address</label>
            <input
              class="form-control"
              type="text"
              placeholder="Street Address"
            >
            <input
              class="form-control"
              type="text"
              placeholder="City"
            >
            <input
              class="form-control"
              type="text"
              placeholder="State"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Country"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Zip Code"
            >
          </div>
          <div class="form-group">
            <label>Contact Information</label>
            <input
              class="form-control"
              type="text"
              placeholder="Phone Number"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Email"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Website"
            >
          </div>
          <div class="form-group">
            <label>Taxes and Withholdings</label>
            <input
              class="form-control"
              type="text"
              placeholder="Federal Income Tax"
            >
            <input
              class="form-control"
              type="text"
              placeholder="State Income Tax"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Social Security"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Medicare"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Individual Retirement"
            >
            <input
              class="form-control"
              type="text"
              placeholder="Other Withholdings"
            >
          </div>
        </div>
        <!-- Actions -->
        <div class="modal-actions">
          <button type="submit" class="btn btn-outline-primary">Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    saveJob() {
      console.log('Will save job')
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-title {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  }
</style>
