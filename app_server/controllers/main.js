
/* Main Controller (for index/homepage) */


// Render homepage view
const index = (req, res) => {
    // response to requester
    res.render('index', {title: 'Flowering Spaces - Home'}); // renders index.hbs & passes Browser title
};

// export response
module.exports = {
    index
}