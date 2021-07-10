/**
 * Passport Config file
 */

// Dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users'); // bring in user schema

/**
 * Passport logic: Authenticate User Login Credentials
 */
passport.use(new LocalStrategy({
    // set email as username field (unique id)
    usernameField: 'email'
},
    (username, password, done) => {
        // mongoose method to find email
        User.findOne({ email: username }, (err, user) => {
            // handle errors
            if (err) { return done(err); }
            // invalid user
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            // invalid password
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            // authentication successful - return user object
            return done(null, user);
        });
    }
));