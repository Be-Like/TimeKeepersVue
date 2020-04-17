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
  },

  mounted() {
    let el = document.getElementsByClassName('mx-datepicker-body')[0]
    el.classList.add('custom-calendar-style')
    el = document.getElementsByClassName('mx-calendar-panel-date')[0]
    el.classList.add('another-custom-calendar-style')
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

  .custom-calendar-style,
  .another-custom-calendar-style {
    width: 100%;

  }

  // .mx-calendar-panel-date {
  //   width: inherit;
  // }

</style>
