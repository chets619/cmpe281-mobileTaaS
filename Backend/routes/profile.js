var express = require('express')
var router = express.Router();
const { checkAuth } = require("../passport");
const User = require('../models/UserModel');

router.get('/getUser/:user_id', (req, res) => {

    User.findById(req.params.user_id).then(user => {
        res.status(200).send({ success: true, user: user });
    }).catch(error => {
        console.log('error', error);
    });

});

router.post('/update', checkAuth, (req, res) => {

    User.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }).then(user => {
        res.status(200).send({ success: true, data: user });
    }).catch(error => {
        console.log('error', error);
    });

});

router.get('/getAdminUsers', async (req, res) => {

    try {
        const result = await User.find();

        res.send({ success: true, data: result })

    } catch (error) {
        res.send(error)
    }

});

router.post('/deleteUser', async (req, res) => {

    try {
        const result = await User.findOneAndDelete({ _id: req.body.id });

        res.send({ success: true, data: result })

    } catch (error) {
        res.send(error)
    }

});

module.exports = router;
