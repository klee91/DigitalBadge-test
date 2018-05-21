const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const StudentData = require("../src/models/StudentSchema.js");
const TeacherData = require("../src/models/TeacherSchema.js");

passport.use(new LocalStrategy({
    emailField: 'email',
    passwordField: 'password'
},function(email, password, done) {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    return StudentData.findOne({email, password})
       .then(user => {
           if (!user) {
               return done(null, false, {message: 'Incorrect email.'});
           }
           if(!user.validPassword(password)) {
               return done(null,false, {message: 'Incorrect password.'})
           }
           return done(null, user, {message: 'Logged In Successfully'});
      })
      .catch(err => done(err));
}
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

module.exports = passport;