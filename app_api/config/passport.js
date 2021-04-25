/**
 * Passport Config file
 */

// dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
// bring in user schema
const User = mongoose.model('users');

/* Passport logic for handling user login credentials */
passport.use(new LocalStrategy({
    // set email as username field (unique id)
    usernameField: 'email'
},
    (username, password, done) => {
        // mongoose function: search database for unique match
        User.findOne({ email: username }, (err, user) => {
            // handle error
            if (err) { return done(err); }
            // no match
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            // found user match -- invalid password
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            // user match & valid password
            return done(null, user);
        });
    }
));