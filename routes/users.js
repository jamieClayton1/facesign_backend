const User = require('../models/User.js');
const router = require('express').Router();

/**
 * Define /users
 */
router.get('/', async (req, res) => {
    const user = new User();
    const users = await user.list();
    res.send(users);
})

/**
 * Define /users/:id
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = new User();
    const userData = await user.get(id);

    res.send(userData);
})

/**
 * Define /users/create
 */
router.post('/create', async (req, res) => {
    const {name, email, faceDescriptor} = req.body;
    const user = new User(name, email, faceDescriptor);
    const success = await user.create();

    res.send({success: success});
})

/**
 * Define /users/log
 */
router.post('/log', async (req, res) => {
    const {userID} = req.body;
    const user = new User();
    const success = await user.logVerification(userID);

    res.send({success: success});
})

module.exports = router;