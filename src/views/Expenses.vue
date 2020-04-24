<template>
  <div class="expenses">
    <div class="row">
      <div class="col-3 expense-list">
        <ExpenseList />
      </div>
      <div class="col-9 expense-info">
        <ExpenseInfo />
      </div>
    </div>
    <!-- Modal -->
    <router-view></router-view>
  </div>
</template>

<script>
import ExpenseList from '../components/expenses/ExpenseList'
import ExpenseInfo from '../components/expenses/ExpenseInfo'
export default {
  components: {
    ExpenseList,
    ExpenseInfo
  }
}
</script>

<style lang="scss" scoped>
  .expenses {
    overflow: hidden;
  }

  .expense-list {
    height: calc(100vh - 64px);
  }

  .expense-info {
    height: calc(100vh - 64px);
  }
</style>
