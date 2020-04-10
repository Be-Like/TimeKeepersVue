<template>
  <div class="job-info-container">
    <div class="job-info-header">
      <h3>{{ job.company }} <small>({{ job.jobTitle }})</small></h3>
    </div>
    <div class="job-info-body">
      <p class="section-label">
        Compensation Information
      </p>
      <div class="compensation-info">
        <p><b>Pay:</b> {{ job.pay }}</p>
        <p><b>Pay Period:</b> {{ job.payPeriod }}</p>
      </div>
      <div class="company-info-container">
        <p class="section-label">
          Company Information
        </p>
        <div class="company-info">
          <p><b>Address:</b> {{ address }}</p>
          <p><b>Phone Number:</b> {{ job.phoneNumber }}</p>
          <p><b>Email:</b> {{ job.email }}</p>
          <p><b>Website:</b> {{ job.website }}</p>
        </div>
      </div>
      <div class="taxes-info-container">
        <p class="section-label">Taxes and Withholdings</p>
        <p><b>Federal Income Tax:</b> {{ job.federalIncomeTax }}</p>
        <p><b>State Income Tax:</b> {{ job.stateIncomeTax }}</p>
        <p><b>Social Security:</b> {{ job.socialSecurity }}</p>
        <p><b>Medicare:</b> {{ job.medicare }}</p>
        <p><b>Other Withholdings:</b> {{ job.otherWithholdings }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      management: state => state.management,
      job: state => state.management.selectedJob
    }),
    address() {
      return this.job.street + ' ' + this.job.city + ' ' +
        this.job.state + ', ' + this.job.zipcode
    }
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

  .job-info-body {
    // display: ;
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

  .company-info-container {
    display: inline-flex;
    flex-direction: column;
    width: 50%;

    @media(max-width: 600px) {
      width: 100%;
    }
  }

  .taxes-info-container {
    display: inline-flex;
    flex-direction: column;
    width: 50%;

    @media(max-width: 600px) {
      width: 100%;
    }
  }
</style>
