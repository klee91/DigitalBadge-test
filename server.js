//TODO:
// 1. Implement Image File System Upload for profile pictures
//    - https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
// 2. JWT Token Authentication
// 3. Express Client Side + API Routing
// 4. added functionality for secret code between teachers to verify the user signup
// 5. React Router (Client-side Routing)
'use strict';

// Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const nconf = require('nconf');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 7000;
const VerifyToken = require('./auth/VerifyToken.js');
const config = require('./config.js');

const StudentData = require("./src/models/StudentSchema.js");
const TeacherData = require("./src/models/TeacherSchema.js");
require('./auth/passport.js');
const apiRoutes = require('./routes/apiroutes.js');

// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
 
// setup the logger
// app.use(morgan('combined', {stream: accessLogStream}))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// nconf.argv().env().file({file: './config.js'});

app.use(cookieParser(config.OREO));

//Connect Flash
app.use(flash());
// app.use((req,res) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader(
    "Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
});

//initiate passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ==================== MONGODB SETUP ====================
// mongoose.connect('mongodb://localhost/eisenhowerDB');
mongoose.connect('mongodb://admin:dbdbdeep@ds119350.mlab.com:19350/eisenhower');

let db = mongoose.connection;

//Check for MongoDB errors...
db.on('error', function(error) {
    console.log(error);
});

// ==================== SERVER ROUTES ====================
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/home', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/home/profile', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/home/badges', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.get('/home/students', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.get('/logout', function (req, res) {
    // console.log('logout route hit');
    // req.session.destroy(function (err) {
    //     res.clearCookie('act');
    //     res.clearCookie('user_id');
    //     res.redirect('/');
    // });
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/get', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/login', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/students/:studentId', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/teachers', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/teachers/:teacherId', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.use('/api', apiRoutes);
// app.use(express.static(path.resolve('./public')));

//==========================================================
//On successful connection...
db.once('open', () => {
    console.log('Mongo connection successful');
    app.listen(PORT, () => {
        console.log("App is listening on PORT " + PORT);
    });
});

module.exports.router;