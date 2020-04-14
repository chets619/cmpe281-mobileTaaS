//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const { mongoDB, frontendURL } = require('./config');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe_281',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', frontendURL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

// ================== Router Config ===========================


app.use(bodyParser.json());
var routes = [
    { "route": "/user", "path": 'user' },
    { "route": "/profile", "path": 'profile' },
    { "route": "/projects", "path": 'projects' },
    // { "route": "/signin", "path": 'signin' },
    // { "route": "/jobs", "path": 'jobs' },
    // { "route": "/applications", "path": 'applications' },
    // { "route": "/events", "path": 'events' },
    // { "route": "/attendees", "path": 'attendees' },
    // { "route": "/company", "path": 'companyprofile' },
    // { "route": "/upload", "path": 'upload' },
    // { "route": "/chat", "path": 'chat' },
];


routes.forEach((route, index) => {
    app.use(route.route, require('./routes/' + route.path));
});






//start your server on port 3001
app.listen(3001);
console.log("Backend Server Listening on port 3001");

module.exports = app;