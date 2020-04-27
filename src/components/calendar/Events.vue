<template>
  <div class="events-container">
    <table>
      <tr class="table-header">
        <th class="title-header">Job</th>
        <th class="time-entry">Start Time</th>
        <th class="time-entry">End Time</th>
      </tr>
      <tr
        v-for="entry in getJobEntriesByDate(calendar.selectedDate)"
        :key="entry._id"
        class="table-entries"
        @click="setSelectedJobEntry(entry)"
      >
        <td>{{ entry.company }} <small>{{ entry.jobTitle }}</small></td>
        <td class="time-entry">{{ getTime(entry.startTime) }}</td>
        <td class="time-entry">{{ getTime(entry.endTime) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { formatTime } from '../../miscellaneous/format-dates'
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('calendar', {
      calendar: state => state
    }),
    ...mapGetters('jobEntries', ['getJobEntriesByDate'])
  },

  methods: {
    ...mapMutations('jobEntries', ['setSelectedJobEntry']),
    getTime(date) {
      return formatTime(date)
    }
  }
}
</script>

<style lang="scss" scoped>
  .events-container {
    padding: 15px 15px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  .table-header {
    border-bottom: 1px solid #ccc;
    font-size: 18px;
  }

  .title-header {
    text-align: left;
  }

  .time-entry {
    text-align: right;
  }

  .table-entries {
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    height: 50px;
    font-size: 17px;

    &:last-child {
      border-bottom: none;
    }
  }
</style>
