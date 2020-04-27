<template>
  <div>
    <!-- Header with add expense entry -->
    <div class="row expense-entry-header">
      <div class="col-9">
        <h3>Expenses</h3>
      </div>
      <div class="col-3 actions">
        <router-link
          :to="{ name: 'addExpense' }"
          tag="i"
          class="material-icons"
        >add</router-link>
      </div>
    </div>
    <!-- Entries -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .expense-entry-header {
    align-items: center;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    padding: 10px 10px;
  }
</style>
