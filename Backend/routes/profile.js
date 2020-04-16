var express = require('express')
var router = express.Router();
const { checkAuth } = require("../passport");
const User = require('../Models/UserModel');

router.get('/getUser/:user_id', checkAuth, (req, res) => {

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

module.exports = router;
