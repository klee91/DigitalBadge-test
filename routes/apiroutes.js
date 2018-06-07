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

// const Promise = require('promise');
// if (typeof localStorage === "undefined" || localStorage === null) {
//     const LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
// }

//once token is successfully retrieved, store to cookie
const tokenSuccess = (req,res,next,token,user,type) => {
    //set access token or 'act'
    console.log(user);

    let cookie = req.cookies.act;
    let cookieUser = user._id;
    if (cookie === undefined || cookieUser === undefined){
        // no: set a new cookie
        res.cookie('act', token, { maxAge: 900000, httpOnly: false, signed: true});
        res.cookie('user_id', user._id, { maxAge: 900000, httpOnly: false, signed: true});
        
        if(type === 's') {
            res.cookie('type', 's',{ maxAge: 900000, httpOnly: false, signed: false});
        } else if (type == 't') {
            res.cookie('type', 't',{ maxAge: 900000, httpOnly: false, signed: false});
        }
        console.log('cookies created successfully');
        res.redirect('http://localhost:3001/home');
        // res.status(200).send({ auth: true, token: token });
    } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
    } 
}

// ==================== API ROUTES ====================
// app.use(express.static(path.resolve('./public')));

//base route
router.get('/', (req, res) => {
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies);
    res.json({ message: 'API Initialized!'});
});


//user specific route
// router.get('/student/me', VerifyToken, (req,res, next) => {

//     StudentData.findById(decoded.id, {password: 0}, function (err, student) {
//         if (err) {return res.status(500).send("There was a problem finding the student.");}
//         if (!student) {return res.status(404).send("No student found.");}
        
//         res.status(200).send(student);
//     });
// });

// router.get('/teacher/me', VerifyToken, (req,res, next) => {
//     TeacherData.findById(decoded.id, {password: 0}, function (err, teacher) {
//         if (err) {return res.status(500).send("There was a problem finding the teacher.");}
//         if (!teacher) {return res.status(404).send("No teacher found.");}
        
//         res.status(200).send(teacher);
//     });
// });

// (err, user, info) => {

//     //passport login error handler
//     if (err || !user) {
//         return res.status(400).json({
//             message: 'Something is not right',
//             user   : user
//         });
//     }
//     // req.login(user, {session: false}, (err) => {
//     //     if (err) {
//     //         res.send(err);
//     //     }
//     //     // generate a signed son web token with the contents of user object and return it in the response
//     //     const token = jwt.sign(user, config.OREO);
//     //     return res.json({user, token});
//     // });
// }

//login route
router.post('/login',
// passport.authenticate('local', {session: true, successRedirect: '/home', failureRedirect:'/', failureFlash: true}, 
(req, res, next) => {
    // let token = req.signedCookies.act;
    // let cookieUser = req.signedCookies.user_id;
    // req.headers['x-access-token'] = req.cookies.act;
    // console.log(cookieUser);
    console.log(req.body);
    // GET CREDENTIALS
    let email = req.body.user.loginemail;
    let password = req.body.user.loginpassword;
    // parameter declarations for user type view
    let pw, uid, type;
    //mongoDB database student query by email
    StudentData.findOne({
        email: email
    }, (err,student) => {
        
        if (student) {
            uid = student._id;
            pw = student.password;
            type = 's';
        }

        //ERROR HANDLER
        if (err) {
            return res.status(500).send('Error on the server.');
        } else if (student === null) {
            console.log('not found in student collection');
            //mongoDB database teacher query by email
            TeacherData.findOne({
                email: email
            }, (err,teacher) => {

                if (teacher) {
                    uid = teacher._id;
                    pw = teacher.password;
                    type = 't';
                }

                if (err) {
                    return res.status(500).send('Error on the server.');
                } else if (teacher === null) {
                    return res.send('User not found');
                }
            })
        }

        // MATCH PASSWORD WITH DATABASE PASSWORD
        //*****MUST BCRYPT COMPARE THE DATABASE HASHED PASSWORD TO MATCH WITH THE INPUTTED PASSWORD******
        let passwordIsValid = bcrypt.compareSync(password, pw);
        if (passwordIsValid) {
            //CREATE TOKEN IF PASSWORD IS STILL VALID
            let token= jwt.sign({id: uid}, config.OREO, {
                expiresIn: 86400 //expires in 24 hours
            });

            //RUN TOKEN ON SUCCESS FUNCTION
            tokenSuccess(req,res,next,token,student,type);
        } else {
            return res.status(401).send({auth: false, token: null});
        }
    })
    //mongoDB database teacher query
    // TeacherData.findOne({
    //     loginemail: email,
    //     loginpassword: password
    // }, function(err,teacher) {
    //     if (err) {
    //         return res.status(500).send('Error on the server.');
    //     } else if (teacher === null) {
    //         return "teacher not found";
    //     }

    //     let passwordIsValid = bcrypt.compare(password, student.password);
    //     if(!passwordIsValid) return res.status(401).send({auth: false, token: null});

    //     let token= jwt.sign({id: teacher._id}, config.OREO, {
    //         expiresIn: 86400 //expires in 24 hours
    //     });
    //     tokenSuccess(req,res,next,token,teacher);
    //     res.status(200).send({auth: true, token: token});
    // })
})
// )
;

//signup route
router.post('/signup', (req,res,next) => {
    console.log(req.body.user);
    let user = req.body.user;
    // generate salt
    let salt = bcrypt.genSaltSync(10);
    console.log(salt);
    // hash password
    let hash = bcrypt.hashSync(user.password, salt);
    console.log(hash);

    // if student is checked in form, create student in DB
    if (user.isStudent) {
        console.log('student create');
        StudentData.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hash
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
            tokenSuccess(req,res,next,token,student);
            // req.flash('success_msg', "You have successfully registered.");
        });
    // if teacher is checked in form, create teacher in DB
    } else if (user.isTeacher) {
        console.log('teacher create');
        TeacherData.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hash
        }, function(error,teacher) {
            if (error) {return res.status(500).send("There was a problem registering the user...");}

            // create a token
            let token = jwt.sign({ id: teacher._id }, config.OREO, {
                expiresIn: 86400 // expires in 24 hours
            });
            tokenSuccess(req,res,next,token,teacher);
            // res.status(200).send({ auth: true, token: token });
        });
    } else {
        console.log("Please select either student or teacher");
    }
    
});

//logout route
router.post('/logout', (req,res) => {
    // res.status(200).send({auth:false, token:null});
    // res.redirect('/');
    req.logOut();
    res.clearCookie('act');
    res.clearCookie('user_id');
    res.clearCookie('type');
    // ****RELOAD PAGE OR REDIRECT TO HOME PAGE CORRECTLY
    res.redirect('/');
});

//get all students
router.get('/students', (req,res) => {
    // jwt.verify(token, config.OREO, function(err, decoded) {
    //     if (err) {
    //         return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    //     }
    //     // if everything good, save to request for use in other routes
    //     req.userId = decoded.id;
    // });
    StudentData.find()
    .then((students) => {
        res.json(students);
        console.log(students);
    });
});

//get student by ID
router.get('/students/:studentId', passport.authenticate('jwt'), (req,res) => {
    StudentData.find({
        "studentId" : parseInt(req.params.studentId)
    })
    .then((data) => {
         res.json(data);
        console.log(data);
    });
});

//get all teachers
router.get('/teachers', 
// passport.authenticate('jwt'), 
(req,res) => {
    TeacherData.find()
    .then((data) => {
        res.json(data);
        console.log(data);
    });
});

//get teacher by ID
router.get('/teachers/:teacherId', passport.authenticate('jwt'), (req,res) => {
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