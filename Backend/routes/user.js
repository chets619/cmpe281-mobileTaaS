var express = require('express')
var router = express.Router();
const User = require('../Models/UserModel');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config');
const { auth } = require("../passport");
auth();


router.post('/signup', (req, res) => {
    console.log("POST signup: " + JSON.stringify(req.body));

    User.findOne({ email: req.body.email }, (error, student) => {
        if (error) {
            res.send({ success: false, error: error });
        }
        if (student) {
            res.send({ success: false, error: "User already exists!" });
        }
        else {
            bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                let newUser = new User({
                    email: req.body.email,
                    password: hash,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    type: req.body.userType
                });

                newUser.save((error, data) => {
                    console.log(data);
                    if (error) {
                        res.send({ success: false, error: error });
                    }
                    else {
                        res.status(200).send({ success: true, error: "User added successfully!" });
                    }
                });
            });
        }
    });
});

router.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email, type: req.body.category }, (error, user) => {
        if (error) {
            res.send({ success: false, error: error });
        }
        if (user) {
            bcrypt.compare(req.body.password, user.password).then((pwRes) => {
                if (!pwRes)
                    res.send({ success: false, error: error });
                else {
                    const payload = { _id: user._id, email: user.email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: 1008000
                    });
                    res.status(200).send({ success: true, token: "JWT " + token });
                }
            });

        }
        else {
            res.status(200).send({ success: false, error: "Invalid Credentials" });
        }
    });
});

module.exports = router;