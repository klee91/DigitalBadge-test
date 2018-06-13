const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const StudentData = require("../src/models/StudentSchema.js");
const TeacherData = require("../src/models/TeacherSchema.js");
const config = require('../config.js');

// passport.use(new LocalStrategy({
//     emailField: 'email',
//     passwordField: 'password'
// }, (email, password, done) => {
//     //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

//    //query student collection
//         StudentData.findOne({'email' : email, 'password' : password}, 'email password', (error, student) => {
//             if (error) { return done(error); }
//             if (!student) {
//                 return done(null, false, { message: 'Incorrect email.' });
//             }
//             if (!student.validPassword(password)) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, student);
//         });

//     //query teacher collection
//         TeacherData.findOne({'email' : email, 'password' : password}, 'email password', (error, teacher) => {
//             if (error) { return done(error); }
//             if (!teacher) {
//                 return done(null, false, { message: 'Incorrect email.' });
//             }
//             if (!teacher.validPassword(password)) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, teacher);
//         });
// }));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    let newuser = req.body.user;
   console.log(email);
   console.log(password);
   //query in student collection, if not found, query in teacher collection
   StudentData.findOne({email : newuser.loginemail}, (err,student) => {
       if (err) { 
            return done(err); 
       } else if (student === null) {
            //teacherQuery(newuser,req,res);
            TeacherData.findOne({email: newuser.loginemail}, (err,teacher) => {
                if (err) { return done(err); }
                if(!teacher) {
                    return done(null, false, {message: 'Unknown teacher.'})
                }
                // done(pwCompare(newuser.loginpassword, teacher, 't',req,res));
                Teacher.comparePassword(newuser.loginpassword, teacher, async (err,isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                            //CREATE TOKEN IF PASSWORD IS STILL VALID
                            let token= jwt.sign({id: uid}, config.OREO, {
                                expiresIn: 86400 //expires in 24 hours
                            });

                            //RUN TOKEN ON SUCCESS FUNCTION
                            await tokenSuccess(req,res,token,student,'s');
                            return done(null, user);
                    } else {
                        return done(null,false,{message: 'Invalid password'})
                    }
                })
                
            })
       } else if (student) {
           // done(pwCompare(newuser.loginpassword, student, 's',req,res));
           Student.comparePassword(newuser.loginpassword, student, async (err,isMatch) => {
               if(err) throw err;
               if(isMatch) {
                    //CREATE TOKEN IF PASSWORD IS STILL VALID
                    let token= jwt.sign({id: uid}, config.OREO, {
                        expiresIn: 86400 //expires in 24 hours
                    });

                    //RUN TOKEN ON SUCCESS FUNCTION
                    await tokenSuccess(req,res,token,student,'s');
                    return done(null, user);
               } else {
                   return done(null,false,{message: 'Invalid password'})
               }
           })
       }
   })

}));
// strategy for web token authentication
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : config.OREO
    }, async (jwtPayload, done) => {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    //query student collection
    try {
        await StudentData.findOne({'email' : jwtPayload.email}, 'email password', (error, student) => {
            if (error) { return done(error); }
            if (!student) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!student.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, student);
        });
    } catch(err) {
        return 'student error occured.';
    }

    //query teacher collection
    try {
        await TeacherData.findOne({'email' : jwtPayload.email}, 'email password', (error, teacher) => {
            if (error) { return done(error); }
            if (!teacher) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!teacher.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, teacher);
        });
    } catch(err) {
        return 'teacher error occured';
    }
}));

module.exports = passport;