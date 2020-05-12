var express = require('express')
var router = express.Router();
const { checkAuth } = require("../passport");
const Message = require('../models/MessageModel');

router.get('/getMessages', async (req, res) => {

    console.log(req.query);
    try {

        let query = req.query.project ? { project: req.query.project } : {};

        const result = await Message.find(query).sort({ date: -1 });

        res.send({ success: true, result: result });

    } catch (error) {
        res.status(400).send(error);

    }

});

router.post('/sendMessage', async (req, res) => {

    try {
        console.log(req.body);

        const msg = new Message({ ...req.body });
        const result = await msg.save();

        res.send({ success: true, result });

    } catch (error) {
        res.send(400).send(error);

    }

});

module.exports = router;