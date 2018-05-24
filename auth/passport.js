const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const StudentData = require("../src/models/StudentSchema.js");
const TeacherData = require("../src/models/TeacherSchema.js");
const config = require('../config.js');

passport.use(new LocalStrategy({
    emailField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

   //query student collection
   try {
        await StudentData.findOne({'email' : email, 'password' : password}, 'email password', (error, student) => {
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
        return 'error occured.';
    }

    //query teacher collection
    try {
        await TeacherData.findOne({'email' : email, 'password' : password}, 'email password', (error, teacher) => {
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
        return 'error occured';
    }
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
        return 'error occured.';
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
        return 'error occured';
    }
}));

module.exports = passport;