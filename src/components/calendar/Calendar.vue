<template>
  <div class="calendar-container">
    <date-picker
      v-model="calendar.selectedDate"
      inline
    />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { mapState } from 'vuex'

export default {
  components: {
    DatePicker
  },

  computed: {
    ...mapState('calendar', {
      calendar: state => state
    })
  },

  mounted() {
    let el = document.getElementsByClassName('mx-datepicker-main')[0]
    el.style.height = '100%'
    el.style.border = 'none'
    el = document.getElementsByClassName('mx-datepicker-content')[0]
    el.style.height = '100%'
    el = document.getElementsByClassName('mx-datepicker-body')[0]
    el.style.height = '100%'
    el = document.getElementsByClassName('mx-calendar-panel-date')[0]
    el.style.width = '100%'
    el.style.height = '100%'
    el = document.getElementsByClassName('mx-calendar-content')[0]
    el.style.height = 'calc(100% - 34px)'
  }
}
</script>

<style lang="scss" scoped>
  .calendar-container,
  .mx-datepicker-inline {
    width: 100%;
    height: 100%;
  }
</style>
