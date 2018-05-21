const express = require('express');
const app = express();
const router = express.Router();

const StudentData = require("../src/models/StudentSchema.js");
const TeacherData = require("../src/models/TeacherSchema.js");
const VerifyToken = require('../auth/VerifyToken.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const config = require('../config.js');
require('../auth/passport.js');
const store = require('store');
const cookieParser = require('cookie-parser');
const Promise = require('promise');
// if (typeof localStorage === "undefined" || localStorage === null) {
//     const LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
// }

//once token is successfully retrieved, store to session
const tokenSuccess = (req,res,next,token) => {
    // store.set('accessToken', token);
    // let a = store.get('accessToken');
    //set access token or 'act'
    return new Promise((resolve,reject) => {
        let cookie = req.cookies.act;
        if (cookie === undefined){
        // no: set a new cookie
        res.cookie('act',token, { maxAge: 900000, httpOnly: false, signed: true});
        console.log('cookie created successfully');
        res.status(200).send({ auth: true, token: token });
        } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
        } 
    });
    // localStorage.setItem('accessToken', token);
    // console.log("accessToken: " + localStorage.getItem('accessToken'));
}

// ==================== API ROUTES ====================
// app.use(express.static(path.resolve('./public')));

//base route
router.get('/', (req, res) => {
    res.json({ message: 'API Initialized!'});
});

//user specific route
router.get('/me', VerifyToken, (req,res, next) => {
    StudentData.findById(decoded.id, {password: 0}, function (err, user) {
        if (err) {return res.status(500).send("There was a problem finding the user.");}
        if (!user) {return res.status(404).send("No user found.");}
        
        res.status(200).send(user);
    });
});

//login route
router.post('/login', (req,res) => {
    StudentData.findOne({
        email: req.body.loginemail
    }, function(err,user) {
        if (err) {return res.status(500).send('Error on the server.');}

        let passwordIsValid = bcrypt.compareSync(req.body.loginpassword, user.password);
        if(!passwordIsValid) return res.status(401).send({auth: false, token: null});

        let token= jwt.sign({id: user._id}, config.OREO, {
            expiresIn: 86400 //expires in 24 hours
        });

        res.status(200).send({auth: true, token: token});
    })

    //Passport POST Login
    passport.authenticate('local', {session: false, successRedirect: '/home', failureRedirect:'/'}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});

//signup route
router.post('/signup', (req,res,next) => {
    
    let user = req.body.user;
    let hashedPassword = bcrypt.hashSync(user.password, 8);

    // if student is checked in form, create student in DB
    if (user.isStudent) {
        StudentData.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword
        }, function(error,student) {
            if(error) {
                console.log(error);
            } else {
                console.log(student);
            }
            // create a token
            let token = jwt.sign({ id: student._id }, config.OREO, {
                expiresIn: 86400 // expires in 24 hours
            });
            tokenSuccess(req,res,next,token).then(function() {
            });
            // req.flash('success_msg', "You have successfully registered.");

            // Redirect after successful registration
            // res.redirect('/login');
        });
    // if teacher is checked in form, create teacher in DB
    } else if (user.isTeacher){
        TeacherData.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword
        }, function(error,teacher) {
            if (error) {return res.status(500).send("There was a problem registering the user...");}

            // create a token
            let token = jwt.sign({ id: teacher._id }, config.OREO, {
                expiresIn: 86400 // expires in 24 hours
            });
            tokenSuccess(req,res,next,token);
            res.status(200).send({ auth: true, token: token });

        });
    } else {
        console.log("Please select either student or teacher");
    }

});

//logout route
router.get('/logout', (req,res) => {
    res.status(200).send({auth:false, token:null});
})

//get all students
router.get('/students', (req,res) => {
    StudentData.find()
    .then((data) => {
        res.json(data);
        console.log(data);
    });
});

//get student by ID
router.get('/students/:studentId', (req,res) => {
    StudentData.find({
        "studentId" : parseInt(req.params.studentId)
    })
    .then((data) => {
         res.json(data);
        console.log(data);
    });
});

//get all teachers
router.get('/teachers', (req,res) => {
    TeacherData.find()
    .then((data) => {
        res.json(data);
        console.log(data);
    });
});

//get teacher by ID
router.get('/teachers/:teacherId', (req,res) => {
    console.log(req.params.teacherId);
    TeacherData.find({
        "teacherId" : parseInt(req.params.teacherId)
    })
    .then((data) => {
         res.json(data);
        console.log(data);
    });
});

// router.get('/get-data', function(req,res) {
//     StudentData.find()
//         .then(function() {
//             res.render('index', {items:doc});
//         })
// })

// router.post('/insert', function(req,res) {
//     let item = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         age: req.body.age
//     };

//     let data = new StudentData(item);
//     data.save();

//     res.redirect('/');
// })

// router.post('/update', function(req,res) {
//     let item = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         age: req.body.age
//     };
//     let id = req.body.id;

//     StudentData.findById(id, function(err,doc) {
//       if(error) {
//           console.error('error')
//       } 
//       doc.firstName= req.body.firstName;
      
//       doc.save();
//     });
// })

// router.post('/delete', function(req,res) {
//     let id = req.body.id;
//     StudentData.findByIdAndRemove(id).exec();
// });
module.exports = router;