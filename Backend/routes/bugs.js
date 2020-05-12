var express = require('express')
var router = express.Router();
const { checkAuth } = require("../passport");
const Project = require('../models/ProjectModel');
const Bug = require('../models/BugModel');

router.get('/getBugs/:proj_id', checkAuth, (req, res) => {
    console.log('get bugs', req.params.proj_id);

    Project.findById(req.params.proj_id).populate({
        path: "bugs",
        populate: {
            path: "tester",
            model: "user",
            select: ["fname", "lname"]
        }
    }).then(data => {
        res.status(200).send({ success: true, bugs: data.bugs });
    }).catch(error => {
        console.log('error', error);
    });

});

router.post('/addBug', checkAuth, (req, res) => {
    console.log('add bug', req.body);

    let bug = new Bug({
        title: req.body.title,
        tester: req.body.tester,
        severity: req.body.severity,
        hardware: req.body.hardware,
        os: req.body.os,
        version: req.body.version,
        script: req.body.script,
        desc: req.body.desc
    });

    bug.save((error, data) => {
        console.log(data);
        if (error) {
            res.send({ success: false, error: "Error!" });
        }
        else {
            Project.findById(req.body.proj_id).then(async project => {
                if (project) {
                    project.bugs.push(data._id);
                    let updated = await project.save();

                    res.send({ success: true, data: updated });

                } else {
                    res.send({ success: false, error: "Invalid Project" });
                }
            }).catch(error => {
                console.log('error', error);
            });
        }
    });
});

router.post('/changeStatus', checkAuth, (req, res) => {
    console.log('Change Status', req.body);

    Bug.findOneAndUpdate({ _id: req.body.id }, { status: req.body.status }, { new: true }).then(response => {
        console.log(response);
        res.send({ success: true, data: response })

    }).catch(error => {
        res.send({ success: false, error: "Some error occurred!" })
    })
});

module.exports = router;
