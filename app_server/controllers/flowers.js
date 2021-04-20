// import
const fs = require('fs');
const flower = JSON.parse(fs.readFileSync('./data/flowers.json', 'utf8'));


/* GET flowers page */
const flowers = (req, res) => {

    // page title variable checks current node process running, the environment variables within it,
    // and then package description from package.json ... then add name of page at the end.
    let pageTitle = process.env.npm_package_description + ' - Flowers';
    
    res.render('flowers', {title: pageTitle, flower}); // render 'flowers' and pass array of objects
};

// export response
module.exports = {
    flowers
}