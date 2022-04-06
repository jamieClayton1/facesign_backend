const User = require('../models/User.js');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const user = new User();
    const users = await user.list();
    res.send(users);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = new User();
    const userData = await user.get(id);

    res.send(userData);
})

router.post('/create', async (req, res) => {
    const {name, email, faceDescriptor} = req.body;
    const user = new User(name, email, faceDescriptor);
    const success = await user.create();

    res.send({success: success});
})

router.post('/log', async (req, res) => {
    const {userID} = req.body;
    const user = new User();
    const success = await user.logVerification(userID);

    res.send({success: success});
})

module.exports = router;