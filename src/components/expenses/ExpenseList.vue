<template>
  <div class="expense-list-container">
    <!-- Header -->
    <div class="row expense-list-header">
      <div class="col-9">
        <h3>Expense List</h3>
      </div>
      <div class="col-3 actions">
        <router-link
          :to="{ name: 'addExpense' }"
          tag="i"
          class="material-icons"
        >add</router-link>
      </div>
    </div>
    <!-- Content: list -->
    <table>
      <tr
        v-for="expense in expenses"
        :key="expense._id"
        @click="setSelectedExpense(expense)"
      >
        <td>{{ expense.expense }}</td>
        <td>{{ getFormattedDate(expense.expenseDate) }}</td>
        <td>${{ expense.cost }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { formatDate } from '../../miscellaneous/format-dates'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('expenses', {
      expenses: store => store.expenseArray
    })
  },

  mounted() {
    this.getExpenses()
  },

  methods: {
    ...mapActions('expenses', ['getExpenses']),
    ...mapMutations('expenses', ['setSelectedExpense']),
    getFormattedDate(date) {
      return formatDate(date)
    }
  }
}
</script>

<style lang="scss" scoped>
  .expense-list-container {
    border-right: 1px solid #ccc;
    height: 100%;
  }

  .expense-list-header {
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
  }
</style>
