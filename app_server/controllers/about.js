
/* About Controller */


// Render 'about' view
const about = (req, res) => {
    // response to requester
    res.render('about', {title: 'Flowering Spaces - About'});
};

// export response
module.exports = {
    about
}