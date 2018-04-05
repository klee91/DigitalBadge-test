//TODO:
// 1. Implement Image File System Upload for profile pictures
//    - https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
// 2. JWT Token Authentication
// 3. Express Client Side + API Routing

'use strict';

// Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
 
// setup the logger
// app.use(morgan('combined', {stream: accessLogStream}))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

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

// ==================== JWT AUTHENTICATION ====================
const authCheck = jwt({
    secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
          jwksUri: "https://{YOUR-AUTH0-DOMAIN}/.well-known/jwks.json"
      }),
      // This is the identifier we set when we created the API
      audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
      issuer: '{YOUR-AUTH0-DOMAIN}',
      algorithms: ['RS256']
});

// ==================== MONGODB SETUP ====================
mongoose.connect('mongodb://localhost/eisenhowerDB');

let db = mongoose.connection;

//Check for MongoDB errors...
db.on('error', function(err) {
    console.log(err);
});

const StudentData = require("./src/models/StudentSchema.js");
const TeacherData = require("./src/models/TeacherSchema.js")

// ==================== SERVER ROUTES ====================
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/get', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/students', function(req,res) {
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

// router.get('/get-data', function(req,res) {
//     StudentData.find()
//         .then(function() {
//             res.render('index', {items:doc});
//         })
// })

// router.post('/insert', function(req,res) {
//     const item = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         age: req.body.age
//     };

//     const data = new StudentData(item);
//     data.save();

//     res.redirect('/');
// })

// router.post('/update', function(req,res) {
//     const item = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         age: req.body.age
//     };
//     const id = req.body.id;

//     StudentData.findById(id, function(err,doc) {
//       if(error) {
//           console.error('error')
//       } 
//       doc.firstName= req.body.firstName;
      
//       doc.save();
//     });
// })

// router.post('/delete', function(req,res) {
//     const id = req.body.id;
//     StudentData.findByIdAndRemove(id).exec();
// });

// ==================== API ROUTES ====================
app.use('/api', router);
// app.use(express.static(path.resolve('./public')));

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.get('/students', function(req,res) {
    StudentData.find()
    .then(function(data) {
        res.json(data);
        console.log(data);
    });
});

router.get('/students/:studentId', function(req,res) {
    StudentData.find({
        "studentId" : parseInt(req.params.studentId)
    })
    .then(function(data) {
        res.json(data);
        console.log(data);
    });
});

router.get('/teachers', function(req,res) {
    TeacherData.find()
    .then(function(data) {
        res.json(data);
        console.log(data);
    });
});

router.get('/teachers/:teacherId', function(req,res) {
    console.log(req.params.teacherId);
    TeacherData.find({
        "teacherId" : parseInt(req.params.teacherId)
    })
    .then(function(data) {
        res.json(data);
        console.log(data);
    });
});

//==========================================================
//On successful connection...
db.once('open', function() {
    console.log('Mongo connection successful');
    app.listen(PORT,function() {
        console.log("App is listening on PORT " + PORT);
    });
});

module.exports.router;