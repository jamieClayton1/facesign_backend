const Schedule = require('../models/Schedule.js');
const router = require('express').Router();

router.post('/', async (req, res) => {
    const date = req.body.date;
    const schedule = new Schedule();
    const schedules = await schedule.list(date);
    res.send(schedules);
})

router.get('/:id', async (req, res) => {
    // const id = req.params.id;
    // const user = new User();
    // const userData = await user.get(id);

    // res.send(userData);
})

router.post('/create', async (req, res) => {
    const {userID, from, to, date} = req.body;
    const schedule = new Schedule(userID, from, to, date);
    const success = await schedule.create();

    res.send({success: success});
})

router.post('/log', async (req, res) => {
    // const {userID} = req.body;
    // const user = new User();
    // const success = await user.logVerification(userID);

    // res.send({success: success});
})

module.exports = router;