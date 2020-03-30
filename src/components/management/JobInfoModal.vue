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
          <input
            type="text"
            placeholder="Company"
          >
          <input
            type="text"
            placeholder="Job Title"
          >
          <input
            type="number"
            placeholder="Pay/Pay Rate"
          >
          <input
            type="text"
            placeholder="Pay Period"
          >
          <input
            type="text"
            placeholder="Street Address"
          >
          <input
            type="text"
            placeholder="City"
          >
          <input
            type="text"
            placeholder="State"
          >
          <input
            type="text"
            placeholder="Country"
          >
          <input
            type="text"
            placeholder="Zip Code"
          >
          <input
            type="text"
            placeholder="Phone Number"
          >
          <input
            type="text"
            placeholder="Email"
          >
          <input
            type="text"
            placeholder="Website"
          >
          <input
            type="text"
            placeholder="Federal Income Tax"
          >
          <input
            type="text"
            placeholder="State Income Tax"
          >
          <input
            type="text"
            placeholder="Social Security"
          >
          <input
            type="text"
            placeholder="Medicare"
          >
          <input
            type="text"
            placeholder="Individual Retirement"
          >
          <input
            type="text"
            placeholder="Other Withholdings"
          >
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
