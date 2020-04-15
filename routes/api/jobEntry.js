const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// const User = require('../../models/User');
// const Job = require('../../models/Job');
const JobEntry = require('../../models/JobEntry');

/**
 * @route GET api/job-entry
 * @description Get all job entries
 * @access Private
 */
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      let jobEntries = await JobEntry.find({ user: req.user.id })
      res.send(jobEntries)
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error')
    }
  }
)

/**
 * @route GET api/job-entry/:job_id
 * @description Get all job entries for a selected job
 * @access Private
 */
// router.get()

/**
 * @route POST api/job-entry
 * @description Create a job entry
 * @access Private
 */
router.post(
  '/',
  auth,
  [],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() })
    }

    try {
      const {
        job,
        startTime,
        endTime,
        breakTimes,
        hoursWorked,
        pay,
        notes
      } = req.body

      const newEntry = new JobEntry({
        user: req.user.id,
        job,
        startTime,
        endTime,
        breakTimes,
        hoursWorked,
        pay,
        notes
      })

      const entry = await newEntry.save();
      res.json(entry)
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
)

/**
 * @route PUT api/job-entry/:entry_id
 * @description Edit selected job entry
 * @access Private
 */
// router.put()

/**
 * @route DELETE api/job-entry/:entry_id
 * @description Delete selected job entry
 * @access Private
 */
// router.delete()

module.exports = router;
