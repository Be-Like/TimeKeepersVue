<template>
  <div class="expense-list-container">
    <!-- Header -->
    <div class="row expense-list-header">
      <div class="col-9">
        <h3>Expense List</h3>
      </div>
      <div class="col-3 actions">
        <router-link
          :to="{ name: path }"
          tag="i"
          class="material-icons"
        >add</router-link>
      </div>
    </div>
    <!-- Content: list -->
    <div class="expense-list-body">
      <table>
        <tr
          v-for="expense in expenses"
          :key="expense._id"
          @click="selectExpense(expense)"
        >
          <td class="outer-info">{{ expense.expense }}</td>
          <td class="secondary-info">{{ getFormattedDate(expense.expenseDate) }}</td>
          <td class="secondary-info outer-info">${{ expense.cost }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../miscellaneous/format-dates'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  props: {
    dashboardComponent: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      path: {
        default: 'addExpense',
        type: 'String'
      }
    }
  },

  computed: {
    ...mapState('expenses', {
      expenses: store => store.expenseArray
    })
  },

  mounted() {
    this.getExpenses()
    this.path = this.$parent.$el.className === 'dashboard' ?
      'addExpenseDashboard' : 'addExpense'
  },

  methods: {
    ...mapActions('expenses', ['getExpenses']),
    ...mapMutations('expenses', ['setSelectedExpense']),
    getFormattedDate(date) {
      return formatDate(date)
    },
    selectExpense(expense) {
      if (this.dashboardComponent) {
        this.$router.push( {name: 'Expenses' })
      }
      this.setSelectedExpense(expense)
    }
  }
}
</script>

<style lang="scss" scoped>
  .expense-list-container {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    height: 100%;
  }

  .expense-list-header {
    align-items: center;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    padding: 10px 10px;
  }

  .expense-list-body {
    height: calc(100% - 79.44px);
    overflow: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tr {
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    height: 50px;

    .outer-info {
      padding: 0px 10px;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .secondary-info {
    text-align: right;
  }
</style>
