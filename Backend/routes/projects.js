var express = require('express');
var router = express.Router();
const { checkAuth } = require("../passport");
const mongoose = require('mongoose');
const Project = require('../Models/ProjectModel');

router.get('/getProjects/:type/:user_id', checkAuth, (req, res) => {
    console.log('GET projects ', req.params)

    if (req.params.type === "Tester")
        Project.find({}).populate({
            path: 'attendees',
            match: { _id: req.params.user_id }
        }).then(user => {
            console.log('user.projects', user.projects)
            res.status(200).send({ success: true, projects: user });

        }).catch(error => {
            console.log('error', error);
        });
    else {

        Project.find({ manager: req.params.user_id }).then(user => {
            console.log('user.projects', user)
            res.status(200).send({ success: true, projects: user });
        }).catch(error => {
            console.log('error', error);
        });
    }
});

router.post('/addProject', checkAuth, (req, res) => {
    console.log('add project', { ...req.body });

    let project = new Project({
        ...req.body
    });

    project.save((error, data) => {
        if (error) {
            res.send({ success: false, error: error });
        }
        else {
            res.send({ success: true, msg: "Project Added Successfully!" });
        }
    });
});

router.get('/getAllProjects', checkAuth, (req, res) => {
    console.log('GET projects ')

    if (req.params.type === "Tester")
        Project.find({}).then(user => {
            res.status(200).send({ success: true, projects: user });
        }).catch(error => {
            console.log('error', error);
        });
    else {
        Project.find({ manager: req.params.user_id }).then(user => {
            res.status(200).send({ success: true, projects: user });
        }).catch(error => {
            console.log('error', error);
        });
    }
});

router.get('/getTesters/:id', checkAuth, (req, res) => {
    console.log('GET testers ' + req.params.id)

    Project.findById(req.params.id).populate("testers").then(user => {
        res.status(200).send({ success: true, testers: user.testers });
    }).catch(error => {
        console.log('error', error);
    });
});


router.post('/addTester', checkAuth, (req, res) => {
    console.log('POST add tester ' + req.body.p_id)

    Project.findById(req.body.p_id).then(async project => {
        if (project.testers.indexOf(req.body.t_id) > -1) {
            res.send({
                success: false,
                error: "Already A Tester"
            });
        }
        else {
            project.testers.push(req.body.t_id);
            let updated = await project.save();
            console.log('updated', updated)
            res.send({
                success: true,
                result: updated.testers
            });
        }
    }).catch(error => {
        console.log('error', error);
    });
});



module.exports = router;
