<template>
  <div class="job-info-container">
    <div class="job-info-header">
      <h3>{{ job.company }} <small>({{ job.jobTitle }})</small></h3>
    </div>
    <p>Pay: {{ job.pay }}</p>
    <p>Pay Period: {{ job.payPeriod }}</p>
    <p>Street: {{ job.street }}</p>
    <p>City: {{ job.city }}</p>
    <p>State: {{ job.state }}</p>
    <p>Country: {{ job.country }}</p>
    <p>Zip Code: {{ job.zipcode }}</p>
    <p>Phone Number: {{ job.phoneNumber }}</p>
    <p>Email: {{ job.email }}</p>
    <p>Website: {{ job.website }}</p>
    <p>Federal Income Tax: {{ job.federalIncomeTax }}</p>
    <p>State Income Tax: {{ job.stateIncomeTax }}</p>
    <p>Social Security: {{ job.socialSecurity }}</p>
    <p>Medicare: {{ job.medicare }}</p>
    <p>Other Withholdings: {{ job.otherWithholdings }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      management: state => state.management,
      job: state => state.management.selectedJob
    })
  }
}
</script>

<style lang="scss" scoped>
  .job-info-container {
    padding: 0 30px;
  }

  .job-info-header {
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
  }
</style>
