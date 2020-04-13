const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// const User = require('../../models/User');
// const Job = require('../../models/Job');
// const JobEntry = require('../../models/JobEntry');

/**
 * @route GET api/job-entry
 * @description Get all job entries
 * @access Private
 */
router.get(
  '/',
  auth,
  [],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() })
    }

    try {
      console.log('Made it to try')
      res.status(400).send('Getting job entries successful')
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error')
    }
  }
)

/**
 * @route POST api/job-entry
 * @description Create a job entry
 * @access Private
 */
// router.post()

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
