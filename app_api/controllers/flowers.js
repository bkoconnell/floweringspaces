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
        .create({  // mongoose create w/ request body
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


// export
module.exports = {
    flowersList,
    flowersFindCode,
    flowersAddFlower
};