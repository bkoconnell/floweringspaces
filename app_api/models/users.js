/**
 * Mongoose Schema for Users
 */

// dependencies
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// define the user schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    hash: String,
    salt: String
});

// method to set user password
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, 'sha512').toString('hex');
};
// method to validate password
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};
// method to generate JSON webtoken
userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000, 10),
    }, 
    // DO NOT KEEP YOUR SECRET IN THE CODE!
    process.env.JWT_SECRET);
};

// call 'model' method, pass name of collection (users) & definition (userSchema)
mongoose.model('users', userSchema);