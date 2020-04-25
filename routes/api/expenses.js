const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Expense = require('../../models/Expense');

/**
 * @route GET api/expenses
 * @desc Get all expenses
 * @access Private
 */
router.get('/', auth, async (req, res) => {
  try {
    let expenses = await Expense.find({ user: req.user.id })
    res.send(expenses)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route POST api/expenses
 * @desc Create an expense
 * @access Private
 */
router.post(
  '/',
  auth,
  [
    check('expense', 'Expense name is required!')
      .not()
      .isEmpty(),
    check('cost', 'Expense cost is required!')
      .not()
      .isEmpty(),
    check('job', 'Job is required!')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Destructure body
      const {
        expense,
        expenseType,
        cost,
        job,
        expenseDate,
        storeName,
        street,
        city,
        state,
        zipcode,
        country
      } = req.body;

      // create new expense object
      const newExpense = new Expense({
        user: req.user.id,
        expense,
        expenseType,
        cost,
        job,
        expenseDate,
        storeName,
        street,
        city,
        state,
        zipcode,
        country
      });

      const expenseInfo = await newExpense.save();

      res.json(expenseInfo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route PUT api/expenses/:expense_id
 * @description Edit an expense
 * @access Private
 */
router.put(
  '/:expense_id',
  auth,
  [
    check('expense', 'Expense name is required!')
      .not()
      .isEmpty(),
    check('cost', 'Expense cost is required!')
      .not()
      .isEmpty(),
    check('job', 'Job is required!')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const expenseEntry = await Expense.findById(req.params.expense_id)

      if (!expenseEntry) {
        return res.status(404).json({ msg: 'Expense not found' })
      }

      if (expenseEntry.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' })
      }

      const {
        expense,
        expenseType,
        cost,
        job,
        expenseDate,
        storeName,
        street,
        city,
        state,
        zipcode,
        country
      } = req.body;

      expenseEntry.expense = expense
      expenseEntry.expenseType = expenseType
      expenseEntry.cost = cost
      expenseEntry.job = job
      expenseEntry.expenseDate = expenseDate
      expenseEntry.storeName = storeName
      expenseEntry.street = street
      expenseEntry.city = city
      expenseEntry.state = state
      expenseEntry.zipcode = zipcode
      expenseEntry.country = country

      await expenseEntry.save()

      res.json(expenseEntry)
    } catch (error) {
      console.error(error.message)
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Expense not found' })
      }
    }
  }
)

/**
 * @route DELETE api/expenses/:expense_id
 * @description Delete selected expense
 * @access Private
 */
router.delete('/:expense_id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expense_id)

    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' })
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await expense.remove()

    res.json({ msg: 'Expense removed' })
  } catch (error) {
    console.error(error.message)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Expense not found' })
    }
  }
})

module.exports = router;
