const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { validationResult } = require('express-validator')
const PunchCard = require('../../models/PunchCard')
const JobEntry = require('../../models/JobEntry')

/**
 * @route GET api/punch-card
 * @description Get current punch card
 * @access Private
 */
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      let punchCard = await PunchCard.find({ user: req.user.id })
      res.send(punchCard)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

/**
 * @route POST api/punch-card
 * @description Clock in on punch card
 * @access Private
 */
router.post(
  '/',
  auth,
  async (req, res) => {
    // If at all possible, if there is another punch card for the user,
    // alert user they are already clocked in to another job
    try {
      let currentPunchCards = await PunchCard.find({ user: req.user.id })

      if (currentPunchCards.length !== 0) {
        return res.status(417).send('Cannot have multiple punch cards')
      }

      const { job } = req.body

      const punchCard = new PunchCard({
        user: req.user.id,
        job,
        startTime: new Date(),
        endTime: undefined,
        breakTimes: undefined
      })

      const entry = await punchCard.save();
      res.json(entry)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

/**
 * @route PUT api/punch-card/:id
 * @description Update current punch card
 * @access Private
 */
router.put(
  '/:punch_card_id',
  auth,
  async (req, res) => {
    try {
      const punchCard = await PunchCard.findById(req.params.punch_card_id)

      if (!punchCard) {
        return res.status(404).json({ msg: 'Punch card not found' })
      }

      if (punchCard.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' })
      }

      const { endTime, breakTimes } = req.body

      if (endTime) {
        const newJobEntry = new JobEntry({
          user: req.user.id,
          job: punchCard.job,
          startTime: punchCard.startTime,
          endTime: endTime,
          breakTimes: [], // Need to work on these
          hoursWorked: undefined, // Need to work on these
          pay: undefined, // Need to work on these
          notes: undefined // Need to work on these
        })

        const entry = await newJobEntry.save()
        punchCard.remove()
        return res.json(entry)
      }
      punchCard.breakTimes.push({
        startTime: "2020-04-15T07:30Z",
        endTime: "2020-04-15T17:30Z"
      })

      await punchCard.save()
      res.json(punchCard)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

/**
 * @route DELETE api/punch-card/:id
 * @description Clock out from current punch card
 * @access Private
 */
// router.delete()

module.exports = router;
