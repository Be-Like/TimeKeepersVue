<template>
  <div class="job-info-container" v-if="job">
    <div class="job-info-header row">
      <h3 class="col-10">{{ job.company }} <small>({{ job.jobTitle }})</small></h3>
      <div class="col-2 icons">
        <router-link
          :to="{
            name: 'editJob',
            params: { id: job._id, job: job }
          }"
          tag="i"
          class="material-icons edit-icon"
        >edit</router-link>
        <i
          class="material-icons delete-icon"
          @click="deleteAlert()"
        >
          delete_forever
        </i>
      </div>
    </div>
    <div class="job-info-body">
      <p class="section-label">
        Compensation Information
      </p>
      <div class="compensation-info">
        <p><b>Payment Type:</b> {{ job.paymentType }}</p>
        <p><b>Pay Date:</b> {{ formattedDate }}</p>
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
import { formatDate } from '../../miscellaneous/format-dates'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('management', {
      management: state => state,
      job: state => state.selectedJob
    }),
    address() {
      return this.job.street + ' ' + this.job.city + ' ' +
        this.job.state + ', ' + this.job.zipcode
    },
    formattedDate() {
      return this.job.payDate ? formatDate(this.job.payDate) : null
    }
  },

  methods: {
    ...mapActions('management', ['deleteJob']),
    deleteAlert() {
      let confirm = window.confirm(
        `Are you sure you want to delete ${this.job.company}` +
        ` ${this.job.jobTitle}?\n${this.job.company} ${this.job.jobTitle} ` +
        'will be permanently deleted.'
      )
      if (confirm) { this.deleteJob(this.job._id) }
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
