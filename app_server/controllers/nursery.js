
/* Nursery Controller */

// create request object for request dependency
const request = require('request');
// create apiOptions object with 1 property: the server URL
const apiOptions = {
    server: 'http://localhost:3000'
}


/* Render Nursery List View */
const renderNurseryList = (req, res, responseBody) => { // method to render NurseryList

    let message = null; // initialize message variable
/*
    // Page title variable checks current node process running, the environment variables within it,
    // and then package description from package.json ... then add name of page at the end.
    let pageTitle = process.env.npm_package_description + ' - Nursery';
*/    
    let pageTitle = 'Flowering Spaces - Nursery'; // temp page title

    // response body is not an array
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error'; // message for API lookup error
        responseBody = [];            // create empty array for response body
    } 
    else {
        // response body is empty array (no length)
        if (!responseBody.length) {                   
            message = 'No flowers exist in database'; // message for no flowers
        }
    }
    // response body from API is array w/ flowers
    // render the response
    res.render('nursery', {
        title: pageTitle,
        flowers: responseBody, // pass array from API (response body) to 'flowers'
        message
    });
};


/* API Call logic */
const nurseryList = (req, res) => {
    const path = '/api/flowers'; // points to REST API location
    const requestOptions = {    // request options (url, method, & json body)
        url: `${apiOptions.server}${path}`, // using `back ticks` will parse & resolve the contents of the URL
        method: 'GET',
        json: {},
    };

    // server console output
    console.info('>> nurseryController.nurseryList calling ' + requestOptions.url);

    // use request object with options
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                // error callback w/ console output
                console.error(err);
            }
            // call the render method for nursery list view
            renderNurseryList(req, res, body); 
        }
    )
}

// export response
module.exports = {
    nurseryList
}