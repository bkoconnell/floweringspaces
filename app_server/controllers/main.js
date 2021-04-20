/* GET homepage */
const index = (req, res) => {
    res.render('index', {title: 'Flowering Spaces'});
};

// export response
module.exports = {
    index
}