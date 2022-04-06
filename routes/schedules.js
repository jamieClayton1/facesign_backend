const Schedule = require('../models/Schedule.js');
const router = require('express').Router();

/**
 * Define /schedules/post
 */
router.post('/', async (req, res) => {
    const date = req.body.date;
    const schedule = new Schedule();
    const schedules = await schedule.list(date);
    res.send(schedules);
})

/**
 * Define /schedules/:id
 */
router.get('/:id', async (req, res) => {
    //TODO
})

/**
 * Define /schedules/create
 */
router.post('/create', async (req, res) => {
    const {userID, from, to, date} = req.body;
    const schedule = new Schedule(userID, from, to, date);
    const success = await schedule.create();

    res.send({success: success});
})

/**
 * Define schedules/log
 */
router.post('/log', async (req, res) => {
  //TODO
})

/**
 * Export router
 */
module.exports = router;