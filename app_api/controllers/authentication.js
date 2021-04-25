/**
 * Authentication controller logic
 */

// Dependencies
const passport = require('passport');
const mongoose = require('mongoose');
// bring in user schema
const User = mongoose.model('users');

/**
 * Method for User Registration
 */
const register = (req, res) => {
    // bad request (missing credential inputs)
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400) // HTTP status code (bad request)
            .json({ "message": "All fields required" });
    }
    // new user instance;  set email & password
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    // set the salt & hash
    user.setPassword(req.body.password);
    // save new user to database
    user.save((err) => {
        // bad request
        if (err) {
            res
                .status(400)
                .json(err);
        }
        // saved successfully
        else {
            // generate json web token
            const token = user.generateJwt();
            res
                .status(200)      // HTTP status code
                .json({ token }); // respond w/ token
        }
    })
};

/**
 * Method for User Login
 */
const login = (req, res) => {
    // bad request (missing credentials)
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    // authenticate credentials w/ local strategy (from passport.js config)
    passport.authenticate('local', (err, user, info) => {
        // user not found
        if (err) {
            return res
                .status(404) // HTTP status code (not found)
                .json(err);  // error response
        }
        // user exists
        if (user) {
            // generate json web token
            const token = user.generateJwt();
            res
                .status(200)      // HTTP status code (OK - success)
                .json({ token }); // respond w/ token

        }
        // unauthorized
        else {
            res
                .status(401) // HTTP status code (unauthorized)
                .json(info); // return 'info' object
        }
    })
    // make sure that req & res are available to Passport
    (req, res);
};
// export methods
module.exports = {
    register,
    login
};
