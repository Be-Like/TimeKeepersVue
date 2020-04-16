<template>
  <div class="calendar">
    <div class="calendar-section">
      <date-picker
        v-model="selectedDate"
        inline
      />
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  components: {
    DatePicker
  },

  data() {
    return {
      selectedDate: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
  .calendar-section {
    height: calc(100vh - 64px);
    overflow: hidden;
    width: 50%;
  }

  // customize date-picker
  .mx-datepicker-inline {
    width: 100%;
  }

  .mx-datepicker-main {
    width: 100%;
  }

  .mx-datepicker-content {
    width: 100%;
  }

  .mx-datepicker-body {
    width: 100%
  }

  .mx-calendar.mx-calendar-panel-date {
    width: 100%;
  }

  .mx-calendar-header {
    width: 100%;
  }
</style>
