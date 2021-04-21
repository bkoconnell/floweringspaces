/* GET homepage view */
const index = (req, res) => {
    res.render('index', {title: 'Flowering Spaces'});
};

// export response
module.exports = {
    index
}