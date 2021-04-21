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


// export
module.exports = {
    flowersList,
    flowersFindCode
};