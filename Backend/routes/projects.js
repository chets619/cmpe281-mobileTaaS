var express = require('express');
var router = express.Router();
const { checkAuth } = require("../passport");
const mongoose = require('mongoose');
const Project = require('../Models/ProjectModel');

router.get('/getProjects/:type/:email/:user_id', checkAuth, (req, res) => {
    console.log('GET projects ')

    if (req.params.type === "Tester") {
        Project.find({ 'testers.id': req.params.user_id }).populate({
            path: "bugs",
            populate: {
                path: "tester",
                model: "user",
                select: ["fname", "lname"]
            }
        }).then(user => {
            user = user.filter(currUser => {
                let curr = currUser.testers.filter(element => element.status == "Accepted" && element.id == req.params.user_id);

                return curr.length;
            });

            console.log(user)
            res.status(200).send({ success: true, projects: user });
        }).catch(error => {
            console.log('error', error);
        });
    }
    else {

        Project.find({ manager: req.params.email }).populate({
            path: "bugs",
            populate: {
                path: "tester",
                model: "user",
                select: ["fname", "lname"]
            }
        }).populate({
            path: "testers.id",
            populate: {
                path: "tester",
                model: "user",
                select: ["fname", "lname"]
            }
        }).then(user => {
            res.status(200).send({ success: true, projects: user });
        }).catch(error => {
            console.log('error', error);
        });
    }
});

router.post('/addProject', checkAuth, (req, res) => {

    let project = new Project({
        ...req.body
    });

    project.save((error, data) => {
        if (error) {
            res.send({ success: false, error: error });
        }
        else {
            res.send({ success: true, project: data });
        }
    });
});

router.get('/getAllProjects/:type/:email/:user_id', checkAuth, (req, res) => {
    console.log('GET projects All')

    if (req.params.type === "Tester")
        Project.find({}).populate({
            path: "bugs",
            populate: {
                path: "tester",
                model: "user",
                select: ["fname", "lname"]
            }
        }).then(user => {
            res.status(200).send({ success: true, projects: user });
        }).catch(error => {
            console.log('error', error);
        });
    else {
        Project.find({ manager: req.params.user_id }).populate({
            path: "testers.id",
            populate: {
                path: "tester",
                model: "user",
                select: ["fname", "lname"]
            }
        }).then(user => {
            res.status(200).send({ success: true, projects: user });
        }).catch(error => {
            console.log('error', error);
        });
    }
});

router.get('/getTesters/:id', checkAuth, (req, res) => {

    Project.findById(req.params.id).populate("testers").then(user => {
        res.status(200).send({ success: true, testers: user.testers });
    }).catch(error => {
        console.log('error', error);
    });
});


router.post('/addTester', checkAuth, (req, res) => {
    console.log('POST add tester ' + req.body.p_id)

    Project.findById(req.body.p_id).then(async project => {
        if (project.testers.find(tester => tester.id == req.body.t_id)) {
            res.send({
                success: false,
                error: "Already Applied"
            });
        }
        else {
            project.testers.push({ id: req.body.t_id });
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

router.post('/deleteTester', checkAuth, (req, res) => {
    console.log('delete tester', req.body)

    Project.findById(req.body.proj_id).then(async project => {
        console.log('project', project.testers)

        if (!project)
            res.send({
                success: false,
                error: "Project Not Found"
            })
        else {
            project.testers = project.testers.filter(tester => tester._id != req.body.id);
            console.log('project after', project.testers)

            let updated = await project.save();

            res.send({
                success: true,
                data: updated
            })
        }
    })

});

router.post('/acceptTester', checkAuth, (req, res) => {
    console.log('accept tester', req.body)

    Project.findById(req.body.proj_id).then(async project => {
        console.log('project', project.testers)

        if (!project)
            res.send({
                success: false,
                error: "Project Not Found"
            })
        else {
            project.testers.find(tester => tester._id == req.body.id).status = "Accepted";
            console.log('project after', project.testers)

            let updated = await project.save();

            res.send({
                success: true,
                data: updated
            })
        }
    })

});



module.exports = router;
