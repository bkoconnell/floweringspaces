/**
 * REST API --> backend (server) controller logic
 */


// dependencies
const mongoose = require('mongoose'); // .set('debug', true);
const Flowers = mongoose.model('flowers'); // instantiate flowers schema


/**
 * Method for GET /flowers
 * returns everything in the flowers collection
 * @param {*} req 
 * @param {*} res 
 */
const flowersList = async (req, res) => {
    // model instance
    Flowers
        // apply the mongoose method to the model & define the method's query:
        // Read All documents in collection (empty filter = find all instances)
        .find({})
        // execute the method & pass a callback function w/ 2 parameters: error object & instance of found document
        .exec((err, flowers) => {
            // output to server console
            console.log('Executing callback function for GET /flowers...');
            // no data found
            if (!flowers) {
                // return response to requester
                return res
                    .status(404) // http status code (not found)
                    .json({      // message response
                        "message": "flowers not found"
                    });
            }
            // bad request, invalid content
            else if (err) {
                // return response to requester
                return res
                    .status(400) // http status code (bad request)
                    .json(err);  // error response
            }
            // request successful
            else {
                // return response to requester
                return res
                    .status(200)    // http status code (OK - success)
                    .json(flowers); // data response
            }
        });
};

/**
 * Method for GET /flowers/:flowerCode
 * returns a single flower based on request parameter (flower code) passed in
 * @param {*} req 
 * @param {*} res 
 */
const flowersFindCode = async (req, res) => {
    // model instance
    Flowers
        // apply the mongoose method to the model & define the method's query:
        // Read matching document filtered by 'code' value of request parameter (flower code)
        .find({ 'code': req.params.flowerCode })
        // execute the method & pass a callback function w/ 2 parameters: error object & instance of found document
        .exec((err, flower) => {
            // output to server console
            console.log('Executing callback function for GET /flowers/:flowerCode...');
            // no matching document found
            if (!flower) {
                // return response to requester
                return res
                    .status(404) // http status code (not found)
                    .json({      // message response
                        "message": "flower not found"
                    });
                // bad request, invalid content
            } else if (err) {
                // return response to requester
                return res
                    .status(400) // http status code (bad request)
                    .json(err);  // error response
                // request successful
            } else {
                // return response to requester
                return res
                    .status(200)   // http status code (OK - success)
                    .json(flower); // data response
            }
        });
};


/**
 * Method for POST /flowers
 * adds new data (flower) to collection based on request body (form data) passed in
 * @param {*} req 
 * @param {*} res 
 */
const flowersAddFlower = async (req, res) => {
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
                // output to server console
                console.log('Executing callback function for POST /flowers...');
                // bad request, invalid content
                if (err) {
                    // return response to requester
                    return res
                        .status(400) // http status code (bad request)
                        .json(err);  // error response
                }
                // request successful (new document added)
                else {
                    // return response to requester
                    return res
                        .status(201)   // http status code (Created successfully)
                        .json(flower); // data response (new document)
                }
            }
        );
}


/**
 * Method for PUT /flowers/:flowerCode
 * locate existing flower document based on request parameter (flower code) passed in
 * then update the document with the request-body values passed in
 * @param {*} req 
 * @param {*} res 
 */
const flowersUpdateFlower = async (req, res) => {
    // output to server console (display incoming request body)
    console.log(req.body);
    // model instance
    Flowers
        // apply the mongoose method to the model & define the method's query:
        // Read matching document & Update values w/ request body
        .findOneAndUpdate(
            // filter query by flower code from request
            { 'code': req.params.flowerCode },
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
            // set query option 'new' to true
            // so that returned document will reflect updated data
            { new: true }
        )
        // pass callback w/ parameter: instance of updated document
        .then(flower => {
            // output to server console
            console.log('Executing callback function for PUT /flowers/:flowerCode...');
            // no matching document found
            if (!flower) {
                // return response to requester
                return res
                    .status(404) // http status code (not found)
                    .send({      // send message response
                        message: "No flower found with code " + req.params.flowerCode
                    });
            }
            // request successful (document found & updated)
            // response to requester
            res
                .status(200)   // http status code (OK - success)
                .send(flower); // data response (send updated document)
        })
        // error handling callback w/ parameter: error object
        .catch(err => {
            // output to server console
            console.log('Executing ERROR callback function...');
            // no matching document found
            if (err.kind === 'ObjectId') {
                // return response to requester
                return res
                    .status(404)  // http status code (not found)
                    .send({       // send message response
                        message: "Flower not found with code " + req.params.flowerCode
                    });
            }
            // return response to requester
            return res
                .status(500) // internal server error
                .json(err);  // error response
        });
}


/**
 * Method for DELETE /flowers/:flowerCode
 * locate existing flower document based on request parameter (flower code) passed in
 * then remove the document from the database collection
 * @param {*} req 
 * @param {*} res 
 */

const flowersDeleteFlower = async (req, res) => {
    // destructure assignment to extract request parameter 'flowerCode'
    const { flowerCode } = req.params;
    // flowerCode document is found
    if (flowerCode) {
        // model instance
        Flowers
            // apply the mongoose method to the model & define the method's query:
            // Read matching document & Delete from database collection
            .findByIdAndRemove(flowerCode)
            // execute the method & pass a callback function w/ parameters: error object
            .exec((err, flower) => {
                // output to server console
                console.log('Executing callback function for DELETE /flowers/:flowerCode...');
                // bad request, invalid content
                if (err) {
                    // return response to requester
                    return res
                        .status(404) // http status code (error)
                        .json(err);  // error response
                }
                // request successful
                // response to requester
                res
                    .status(204)
                    .json(null);
            });
    }
    // no document found
    else {
        // output to server console
        console.log('No matching documents in database collection for code ' + flowerCode);
        // response to requester
        res
            .status(404) // http status code (not found)
            .json({      // message response
                "message": "No Flower found"
            });
    }
}


// export
module.exports = {
    flowersList,
    flowersFindCode,
    flowersAddFlower,
    flowersUpdateFlower,
    flowersDeleteFlower
};