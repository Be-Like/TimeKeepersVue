<template>
  <div class="expense-info-container" v-if="expense">
    <div class="expense-info-header row">
      <h3 class="col-10">
        {{ expense.expense }}
      </h3>
      <div class="col-2 icons">
        <router-link
          :to="{
            name: 'editExpense',
            params: { id: expense._id, expense: expense }
          }"
          tag="i"
          class="material-icons edit-icon"
        >edit</router-link>
        <i
          class="material-icons delete-icon"
        >
          delete_forever
        </i>
      </div>
    </div>
    <div class="expense-info-body">
      <p class="section-label">Job Information</p>
      <div class="job-info">
        <p><b>Company:</b> {{ expense.company }}</p>
        <p><b>Job Title:</b> {{ expense.jobTitle }}</p>
      </div>
      <p class="section-label">Expense Information</p>
      <div class="expense-info-section">
        <p><b>Expense:</b> {{ expense.expense }}</p>
        <p><b>Vendor:</b> {{ expense.storeName }}</p>
        <p><b>Expense Type:</b> {{ expense.expenseType }}</p>
        <p><b>Cost:</b> ${{ expense.cost.toFixed(2) }}</p>
        <p><b>Date:</b> {{ getFormattedDate(expense.expenseDate) }}</p>
      </div>
      <p class="section-label">Address</p>
      <div class="address-info">
        {{ expense.street }} {{ expense.city }}, {{ expense.state }}
        {{ expense.country }} {{ expense.zipcode }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../miscellaneous/format-dates'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('expenses', {
      expense: state => state.selectedExpense
    })
  },

  methods: {
    getFormattedDate(date) {
      return formatDate(date)
    }
  }
}
</script>

<style lang="scss" scoped>
  .expense-info-container {
    padding: 0 30px;
  }

  .expense-info-header {
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

  .job-entry-info-body {
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

  .job-info {
    width: 100%;

    p {
      display: inline-block;
      width: 50%;
    }
  }

  .expense-info-section {
    width: 100%;

    p {
      display: inline-block;
      width: 33%;
    }
  }
</style>
