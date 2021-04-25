
/* Garden Blog Controller */


// Render gardenblog view
const gardenblog = (req, res) => {
    // response to requester
    res.render('gardenblog', {title: 'Flowering Spaces - Garden Blog'});
};

// export response
module.exports = {
    gardenblog
}