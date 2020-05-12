var express = require('express')
var router = express.Router();
const { checkAuth } = require("../passport");

router.get('/getMessages', (req, res) => {

    console.log(req.query);

    res.send("success")

});



module.exports = router;