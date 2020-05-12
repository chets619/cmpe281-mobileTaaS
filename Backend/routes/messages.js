var express = require('express')
var router = express.Router();
const { checkAuth } = require("../passport");
const Message = require('../models/MessageModel');

router.get('/getMessages', async (req, res) => {

    console.log(req.query);

    const result = await Message.find({ project: req.query.project }).sort({ date: -1 });

    console.log(result);

    res.send({ success: true, result: result });

});

router.post('/sendMessage', async (req, res) => {

    console.log(req.body);

    const msg = new Message({ ...req.body });
    const result = await msg.save();

    res.send({ success: true, result });

});

module.exports = router;