/* FIXME:  temporary filestream data read -- not suitable for deployment */
const fs = require('fs');
const flower = JSON.parse(fs.readFileSync('./data/flowers.json', 'utf8'));


/* GET nursery page */
const nursery = (req, res) => {

    // page title variable checks current node process running, the environment variables within it,
    // and then package description from package.json ... then add name of page at the end.
    let pageTitle = process.env.npm_package_description + ' -  Nursery';
    
    res.render('nursery', {title: pageTitle, flower}); // render 'nursery' page and pass array of objects (flower)
};

// export responses
module.exports = {
    nursery
}