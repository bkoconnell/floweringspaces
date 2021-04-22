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
        // mongoose function to Read All documents in collection (empty filter = find all instances)
        .find({})
        // execute callback, pass response parameters
        .exec((err, flowers) => {
            // no data found
            if (!flowers) {
                // return response to requester
                return res
                    .status(404)                               // http status code (not found)
                    .json({ "message": "flowers not found" }); // message response
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
                    .status(200)    // http status code (OK - success)
                    .json(flowers); // data response
            }
        });
};

/**
 * Method for GET: /flowers/:flowerCode
 * returns a single flower based on request parameter (flower code) passed in
 * @param {*} req 
 * @param {*} res 
 */
const flowersFindCode = async (req, res) => {
    // model instance
    Flowers
        // mongoose function to Read One document
        // (finds single document where 'code' value matches request parameter/flower code)
        .find({ 'code': req.params.flowerCode })
        // execute callback, pass response parameters
        .exec((err, flower) => {
            // no matching document found
            if (!flower) {
                // return response to requester
                return res
                    .status(404)                             // http status code (not found)
                    .json({ "message": "flower not found"}); // message response
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
 * Method for POST: /flowers
 * adds new data (flower) to collection based on request body (form data) passed in
 * @param {*} req 
 * @param {*} res 
 */
const flowersAddFlower = async (req, res) => {
    // model instance
    Flowers
        // mongoose function to Create New document (w/ form data passed in)
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
        // pass response parameters
        (err, flower) => {
            // bad request, invalid content
            if (err) {
                // return response to requester
                return res
                    .status(400) // http status code (bad request)
                    .json(err);  // error response
            // request successful
            }else{
                // return response to requester
                return res
                    .status(201)   // http status code (Created successfully)
                    .json(flower); // data response
            }
        });
}


/**
 * Method for PUT: /flowers/:flowerCode
 * locate existing flower document based on request parameter (flower code) passed in
 * then update the document with the request-body values passed in
 * @param {*} req 
 * @param {*} res 
 */
const flowersUpdateFlower = async (req, res) => {
    // output to server console for debug (display incoming request body)
    console.log(req.body);
    // model instance
    Flowers
        // mongoose function to Read One document & Update values w/ request body
        .findOneAndUpdate({ 'code': req.params.flowerCode }, {
            code: req.body.code,
            name: req.body.name,
            scientific: req.body.scientific,
            type: req.body.type,
            size: req.body.size,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description
        },        
        { new: true }) // set 'true' for returned document to reflect data AFTER the update
        // callbacks
        .then(flower => {
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
            // response
            res
            .status(200)   // http status code (OK - success)
            .send(flower); // data response (send updated document)
        // error handling
        }).catch(err => {
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


// FIXME: add DELETE method (response status code 204 = successful delete request)


// export
module.exports = {
    flowersList,
    flowersFindCode,
    flowersAddFlower,
    flowersUpdateFlower
};