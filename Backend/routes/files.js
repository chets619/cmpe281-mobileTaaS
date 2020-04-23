var express = require('express')
var router = express.Router();
const { checkAuth } = require("../passport");
const Project = require('../Models/ProjectModel');
const AWS = require('aws-sdk');
const config = require('../config');
var cors = require('cors');
var multer = require('multer');
var multerS3 = require('multer-s3');

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.AWS_REGION
});

router.use(cors());

router.get('/getFiles/:id', checkAuth, (req, res) => {
    Project.findById(req.params.id).populate({
        path: "files.uploader",
        populate: {
            path: "tester",
            model: "user",
            select: ["fname", "lname"]
        }
    }).then(user => {
        res.status(200).send({ success: true, project: user });
    }).catch(error => {
        console.log('error', error);
    });
});

router.get('/getAllFiles/:id', checkAuth, (req, res) => {


    const bucketParams = {
        Bucket: config.bucketName,
        Prefix: req.params.id + "/"
    }
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function (err, data) {
        console.log('data', data)
        if (err) {
            console.log("Error in fetching contents of Bucket: " + err);
            res.status(400).json("Error in fetching contents of Bucket: " + err)
        } else {
            let contents = [];

            data.Contents.forEach((file) => {
                if (file.Key.charAt(file.Key.length - 1) != "/")
                    contents.push({
                        key: file.Key.split("/")[file.Key.split("/").length - 1],
                        modified: file.LastModified,
                        size: file.Size / 1000 + "KB",
                        file_url: config.s3Url + file.Key
                    });
            })
            res.json({ success: true, files: contents })
        }
    });

});

router.get('/getTesterFiles/:projectName/:name', checkAuth, (req, res) => {


    const bucketParams = {
        Bucket: config.bucketName,
        Prefix: req.params.projectName + "/" + req.params.name + "/"
    };
    let files = [];

    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function (err, data) {
        if (err) {
            console.log("Error in fetching contents of Bucket: " + err);
            res.status(400).json("Error in fetching contents of Bucket: " + err)
        } else {
            data.Contents.forEach((file) => {
                if (file.Key.charAt(file.Key.length - 1) != "/")
                    files.push({
                        key: file.Key.split("/")[file.Key.split("/").length - 1],
                        modified: file.LastModified,
                        size: file.Size / 1000 + "KB",
                        file_url: config.s3Url + file.Key,
                        owner: true
                    });
            });
            const bucketParams = {
                Bucket: config.bucketName,
                Prefix: req.params.projectName + "/Public/"
            };
            s3.listObjects(bucketParams, function (err, data) {
                if (err) {
                    console.log("Error in fetching contents of Bucket: " + err);
                    res.status(400).json("Error in fetching contents of Bucket: " + err)
                } else {
                    data.Contents.forEach((file) => {
                        if (file.Key.charAt(file.Key.length - 1) != "/")
                            files.push({
                                key: file.Key.split("/")[file.Key.split("/").length - 1],
                                modified: file.LastModified,
                                size: file.Size / 1000 + "KB",
                                file_url: config.s3Url + file.Key,
                                owner: false
                            });
                    })

                    res.json({ success: true, files: files })
                }
            })
        }
    });

});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.bucketName,
        acl: 'public-read',
        key: function (req, file, cb) {
            const newFilename = req.params.projId + "/" + req.params.folderId + '/' + (file.originalname);
            console.log(newFilename);
            cb(null, newFilename);
        }
    })
});

const singleUpload = upload.single('image');

router.post('/uploadFile/:projId/:folderId', singleUpload, (req, res) => {

    console.log("Upload File: " + req.file.location);

    res.status(200).send({ 'success': true, result: { "image": req.file.location } });
});


router.post('/deleteFile', checkAuth, (req, res) => {

    let body = {
        ...req.body,
        Bucket: "281-mobiletaas"
    }

    s3.deleteObject(body, (err, data) => {
        if (err) res.send({ success: false, error: err });
        else res.send({ success: true });
    });

});

module.exports = router;