
/* Landscapes Controller */


// Render landscapes view
const landscapes = (req, res) => {
    // response to requester
    res.render('landscapes', {title: 'Flowering Spaces - Landscapes'});
};

// export response
module.exports = {
    landscapes
}