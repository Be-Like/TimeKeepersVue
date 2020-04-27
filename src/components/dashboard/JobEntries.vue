<template>
  <div>
    <!-- Header with add job entry -->
    <div class="row job-entry-header">
      <div class="col-9">
        <h3>Job Entries</h3>
      </div>
      <div class="col-3 actions">
        <router-link
          :to="{ name: 'addJobEntry' }"
          tag="i"
          class="material-icons"
        >add</router-link>
      </div>
    </div>
    <!-- Entries -->
    <div class="entry-list-container">
      <div
        class="entry-index"
        v-for="(entry, index) in getJobEntriesArray"
        :key="index"
      >
        <p class="job-list-name col-10">
          {{ entry.company }} <small>{{ entry.jobTitle }}</small>
        </p>
        <p class="job-list-pay col-2">${{ entry.pay }}</p>
        <span class="horizontal-line" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  mounted() {
    this.getJobEntries()
  },

  computed: {
    ...mapGetters('jobEntries', ['getJobEntriesArray'])
  },

  methods: {
    ...mapActions('jobEntries', ['getJobEntries']),
    selectJobEntry(entry) {
      console.log('Entry', entry)
    }
  }
}
</script>

<style lang="scss" scoped>
  .job-entry-header {
    align-items: center;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    padding: 10px 10px;
  }

  .entry-list-container {
    height: calc(100vh - 143.44px);
    overflow: auto;
  }

  .entry-index {
    display: flex;
    flex-wrap: wrap;
  }

  .horizontal-line {
    border-top: 1px solid #ccc;
    display: block;
    margin-bottom: 1px;
    width: 100%;
  }

  .job-list-pay {
    text-align: right;
  }
</style>
