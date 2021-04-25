
/* Contact Controller */


// Render 'contact' view
const contact = (req, res) => {
    // response to requester
    res.render('contact', {title: 'Flowering Spaces - Contact'});
};

// export response
module.exports = {
    contact
}