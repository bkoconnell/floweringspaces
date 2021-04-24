
/* Main Controller (for index/homepage) */

/* GET homepage view */

// DEBUG
console.log('Incoming request to Main Controller');


const index = (req, res) => {
    res.render('nursery', {title: 'Flowering Spaces'});
};

// DEBUG
console.log('Index has been rendered!');

// export response
module.exports = {
    index
}