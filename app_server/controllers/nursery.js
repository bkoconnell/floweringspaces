
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

    // Page title variable checks current node process running, the environment variables within it,
    // and then package description from package.json ... then add name of page at the end.
    let pageTitle = process.env.npm_package_description + ' - Nursery';

    if (!(responseBody instanceof Array)) { // if response body is not an array:
        message = 'API lookup error';       // message for API lookup error,
        responseBody = [];                  // create empty array for response body
    } else {
        if (!responseBody.length) {                   // if response body is empty array (no length):
            message = 'No flowers exist in database'; // message for no flowers exist in db
        }
    }

    // render the response array from the API
    res.render('nursery', {
        title: pageTitle,
        flowers: responseBody, // pass array from API (response body) to 'flowers'
        message
    });
};


/* GET Nursery List View */
const nurseryList = (req, res) => {
    const path = '/api/flowers'; // points to REST API location
    const requestOptions = {    // request options (url, method, & json body)
        url: `${apiOptions.server}${path}`, // using `back ticks` will parse & resolve the contents of the URL
        method: 'GET',
        json: {},
    };

    // send message to console that the controller is sending request to the API
    console.info('>> nurseryController.nurseryList calling ' + requestOptions.url);

    // use request object with options
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err); // callback to handle error (output to console)
            }
            renderNurseryList(req, res, body); // call render method for nursery list view
        }
    )
}


// export response
module.exports = {
    nurseryList
}