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
        breakTimes: undefined,
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
 * @route PUT api/punch-card/clock-out/:id
 * @description Clock out and create new job entry
 * @access Private
 */
router.put(
  '/clock-out/:punch_card_id',
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

      let totalBreakTime = 0
      breakTimes.forEach(time => {
        totalBreakTime += time.endTime.getTime() - time.startTime.getTime()
      });

      const hoursWorked = (new Date(endTime).getTime() - punchCard.startTime.getTime() - totalBreakTime) / (60 * 60 * 1000)

      const newJobEntry = new JobEntry({
        user: req.user.id,
        job: punchCard.job,
        startTime: punchCard.startTime,
        endTime,
        breakTimes,
        hoursWorked,
        pay: undefined, // TODO: Need to work on these
        notes: undefined // TODO: Need to work on these
      })

      const entry = await newJobEntry.save()
      punchCard.remove()
      return res.json(entry)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

/**
 * @route PUT api/punch-card/break/:id
 * @description Update punchcard with new break item in array
 * @access Private
 */
router.put(
  '/break/:punch_card_id',
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
      const { breakTimes } = req.body
      punchCard.breakTimes = breakTimes

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
