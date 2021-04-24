
/* Testimonials Controller */


// Render testimonials view
const testimonials = (req, res) => {
    // response to requester
    res.render('testimonials', {title: 'Flowering Spaces - Testimonials'});
};

// export response
module.exports = {
    testimonials
}