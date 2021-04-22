// dependencies
const mongoose = require('mongoose'); // .set('debug', true);
const Flowers = mongoose.model('flowers'); // bring in flowers schema


// GET: /flowers - lists all the flowers
const flowersList = async (req, res) => {
    Flowers
        .find({}) // mongoose function: find (empty filter to find all instances)
        .exec((err, flowers) => { // execute callback
            if (!flowers) {
                return res
                    .status(404) // no flowers found
                    .json({ "message": "flowers not found" }); // output message
            } else if (err) {
                return res
                    .status(404) // bad request, invalid content
                    .json(err); // output error message
            } else {
                return res
                    .status(200) // flower(s) found successfully
                    .json(flowers); // return flowers list / data
            }
        });
};

// GET: /flowers/:flowerCode - returns a single flower
const flowersFindCode = async (req, res) => {
    Flowers
        .find({ 'code': req.params.flowerCode }) // mongoose function: find by passing code from request parameter
        .exec((err, flower) => { // execute callback
            if (!flower) {
                return res
                    .status(404) // flower not found
                    .json({ "message": "flower not found"}); // output message
            } else if (err) {
                return res
                    .status(404) // bad request, invalid content
                    .json(err); // output error message
            } else {
                return res
                    .status(200) // flower found successfully
                    .json(flower); // return flower data
            }
        });
};

// POST: /flowers    --  post form / add flower
const flowersAddFlower = async (req, res) => {
    Flowers
        .create({  // mongoose function: create (w/ form data/req.body passed in)
            code: req.body.code,
            name: req.body.name,
            scientific: req.body.scientific,
            type: req.body.type,
            size: req.body.size,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description
        },
        (err, flower) => {
            if (err) {
                return res
                    .status(400) // bad request, invalid content
                    .json(err);
            }else{
                return res
                    .status(201) // created successfully
                    .json(flower);
            }
        });
}

// PUT: /flowers/:flowerCode    --  locate flower & update it
const flowersUpdateFlower = async (req, res) => {

    console.log(req.body);  // console output
    
    // search logic to find a match to update
    Flowers
        // mongoose method: search by code and update values with request-body-data passed in
        .findOneAndUpdate({ 'code': req.params.flowerCode }, {
            code: req.body.code,
            name: req.body.name,
            scientific: req.body.scientific,
            type: req.body.type,
            size: req.body.size,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description
        }, { new: true })
        .then(flower => {
            // conditional statement for no match
            if (!flower) {
                return res
                    .status(404)
                    .send({
                        message: "Flower not found with code " + req.params.flowerCode
                    });
            }
            // if match is found, send update to database (request body data)
            res.send(flower);
            // error handling
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Flower not found with code " + req.params.flowerCode
                    });
            }
            return res
                .status(500) // server error
                .json(err);
        });
}


// export
module.exports = {
    flowersList,
    flowersFindCode,
    flowersAddFlower,
    flowersUpdateFlower
};