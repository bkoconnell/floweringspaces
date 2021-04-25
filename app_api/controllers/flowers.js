/**
 * REST API --> backend (server) controller logic
 */


// Dependencies
const mongoose = require('mongoose'); // .set('debug', true);
// instantiate schemas
const Flowers = mongoose.model('flowers');
const User = mongoose.model('users');


/**
 * Method for GET /flowers
 * [returns everything in the flowers collection]
 */
const flowersList = async (req, res) => {
    // model instance
    Flowers
        // apply the mongoose method to the model & define the method's query:
        // Read All documents in collection (empty filter = find all instances)
        .find({})
        // execute the method & pass a callback function w/ 2 parameters: error object & instance of found document
        .exec((err, flowers) => {
            console.log('Executing callback function for GET /flowers...');
            // no data found
            if (!flowers) {
                return res
                    .status(404) // http status code (not found)
                    .json({      // message response
                        "message": "flowers not found"
                    });
            }
            // bad request, invalid syntax
            else if (err) {
                return res
                    .status(400) // http status code (bad request)
                    .json(err);  // error response
            }
            // request successful
            else {
                return res
                    .status(200)    // http status code (OK - success)
                    .json(flowers); // data response
            }
        });
};

/**
 * Method for GET /flowers/:flowerCode
 * [returns a single flower based on URL parameter (flower code) passed in]
 */
const flowersFindCode = async (req, res) => {
    // model instance
    Flowers
        // apply the mongoose method to the model & define the method's query:
        // Read matching document filtered by 'code' value of request parameter (flower code)
        .find({ 'code': req.params.flowerCode })
        // execute the method & pass a callback function w/ 2 parameters: error object & instance of found document
        .exec((err, flower) => {
            console.log('Executing callback function for GET /flowers/:flowerCode...');
            // no matching document found
            if (!flower) {
                return res
                    .status(404) // http status code (not found)
                    .json({      // message response
                        "message": "flower not found"
                    });
            }
            // bad request, invalid syntax
            else if (err) {
                return res
                    .status(400) // http status code (bad request)
                    .json(err);  // error response
            }
            // request successful
            else {
                return res
                    .status(200)   // http status code (OK - success)
                    .json(flower); // data response
            }
        });
};


/**
 * Method for POST /flowers
 * [adds new data (flower) to flower collection based on request body (form data) passed in]
 */
const flowersAddFlower = async (req, res) => {
    console.log('Verifying user authorization for flowersAddFlower() method...');
    // REQUIRES AUTHORIZATION -- call getUser() method
    getUser(req, res,
        (req, res) => {
            // model instance
            Flowers
                // apply the mongoose method to the model & define the method's query:
                // Create New document w/ the form data passed in from request
                .create({
                    // form data 
                    code: req.body.code,
                    name: req.body.name,
                    scientific: req.body.scientific,
                    type: req.body.type,
                    size: req.body.size,
                    price: req.body.price,
                    image: req.body.image,
                    description: req.body.description
                },
                    // pass a callback function w/ 2 parameters: error object & instance of document added
                    (err, flower) => {
                        console.log('Executing callback function for POST /flowers...');
                        // bad request, invalid syntax
                        if (err) {
                            return res
                                .status(400) // http status code (bad request)
                                .json(err);  // error response
                        }
                        // request successful (new document added)
                        else {
                            return res
                                .status(201)   // http status code (Created successfully)
                                .json(flower); // data response (new document)
                        }
                    }
                );
        }
    );
}


/**
 * Method for PUT /flowers/:flowerCode
 * [locate existing flower document based on URL parameter (flower code)
 * then update the document with the request-body values passed in]
 */
const flowersUpdateFlower = async (req, res) => {
    // output to server console (display incoming request body)
    console.log(req.body);
    // destructure assignment to extract request parameter 'flowerCode'
    const { flowerCode } = req.params;
    // model instance
    Flowers
        // apply the mongoose method to the model & define the method's query:
        // Read matching document & Update values w/ request body
        .findOneAndUpdate(
            // filter query by flower code from request
            { 'code': flowerCode },
            // update queried document w/ values from the request body:
            {
                code: req.body.code,
                name: req.body.name,
                scientific: req.body.scientific,
                type: req.body.type,
                size: req.body.size,
                price: req.body.price,
                image: req.body.image,
                description: req.body.description
            },
            // set query option 'new' to true so that returned document will reflect updated data
            { new: true }
        )
        // pass callback w/ parameter: instance of updated document
        .then(flower => {
            console.log('Executing callback function for PUT /flowers/:flowerCode...');
            // no matching document found
            if (!flower) {
                return res
                    .status(404) // http status code (not found)
                    .send({      // send message response
                        message: "No flower found with code " + flowerCode
                    });
            }
            // request successful (document found & updated)
            res
                .status(200)   // http status code (OK - success)
                .send(flower); // data response (send updated document)
        })
        // error handling callback
        .catch(err => {
            console.log('Executing ERROR callback function inside flowersUpdateFlower()...');
            // no matching document found
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)  // http status code (not found)
                    .send({       // send message response
                        message: "Flower not found with code " + flowerCode
                    });
            }
            // server error
            return res
                .status(500) // internal server error
                .json(err);  // error response
        });
}


/**
 * Method for DELETE /flowers/:flowerCode
 * [locate existing flower document based on URL parameter (flower code)
 * then remove the document from the database collection]
 */
const flowersDeleteFlower = async (req, res) => {
    // destructure assignment to extract request parameter 'flowerCode'
    const { flowerCode } = req.params;
    // model instance
    Flowers
        // apply the mongoose method to the model & define the method's query:
        // Read matching document & Delete from database collection
        .findOneAndDelete(
            // filter query by flower code from request
            { 'code': flowerCode }
        )
        // pass callback w/ parameter: instance of document found
        .then(flower => {
            console.log('Executing callback function for DELETE /flowers/:flowerCode...');
            // no matching document found
            if (!flower) {
                return res
                    .status(404) // http status code (not found)
                    .send({      // send message response
                        message: "No flower found in database for code " + flowerCode
                    });
            }
            // request successful (document found & deleted)              
            res
                .status(204)   // http status code (OK - success)
                .send(flower); // data response (send document)
        })
        // error handling callback w/ parameter: error object
        .catch(err => {
            console.log('Executing ERROR callback function inside flowersDeleteFlower()...');
            // no matching document found
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)  // http status code (not found)
                    .send({       // send message response
                        message: "No documents found in database for code " + flowerCode
                    });
            }
            // server error
            return res
                .status(500) // internal server error
                .json(err);  // error response
        });
}


/**
 * Method to Check User Authorization
 */
const getUser = (req, res, callback) => {
    // request has payload & the payload contains email address
    if (req.payload && req.payload.email) {
        // model instance
        User
            // mongoose method to Read user's email in user collection
            .findOne({ email: req.payload.email })
            // execute callback w/ parameters
            .exec((err, user) => {
                // user not found
                if (!user) {
                    return res
                        .status(404) // HTTP status code (not found)
                        .json({ "message": "User not found" });
                } 
                // bad request, invalid syntax
                else if (err) {
                    console.log(err);
                    return res
                        .status(400) // HTTP status code (bad request)
                        .json(err);
                }
                // user match
                callback(req, res, user.name);
            });
    }
    // payload or email not found
    else {
        return res
            .status(404) // HTTP status code (not found)
            .json({ "message": "User not found" });
    }
};


// export methods
module.exports = {
    flowersList,
    flowersFindCode,
    flowersAddFlower,
    flowersUpdateFlower,
    flowersDeleteFlower
};