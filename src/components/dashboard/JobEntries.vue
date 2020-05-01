<template>
  <div class="entry-list-container">
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
    <table>
      <tr
        v-for="entry in getJobEntriesArray"
        :key="entry._id"
        @click="selectJobEntry(entry)"
      >
        <td>{{ entry.company }} <small>{{ entry.jobTitle }}</small></td>
        <td>${{ entry.pay.toFixed(2) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  mounted() {
    this.getJobEntries()
  },

  computed: {
    ...mapGetters('jobEntries', ['getJobEntriesArray'])
  },

  methods: {
    ...mapActions('jobEntries', ['getJobEntries']),
    ...mapMutations('jobEntries', ['setSelectedJobEntry']),
    ...mapMutations('calendar', ['setSelectedDate']),
    selectJobEntry(entry) {
      this.setSelectedJobEntry(entry)
      this.setSelectedDate(new Date(entry.startTime))
      this.$router.push({ name: 'Calendar' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .entry-list-container {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    height: 100%;
  }

  .job-entry-header {
    align-items: center;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    padding: 10px 10px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tr {
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    height: 50px;

    &:last-child {
      border-bottom: none;
    }

    td {
      padding: 0 10px;

      &:last-child {
        text-align: right;
      }
    }
  }
</style>
