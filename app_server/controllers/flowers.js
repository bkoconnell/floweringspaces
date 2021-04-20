/* GET flowers page */
const flowers = (req, res) => {

    // page title variable checks current node process running, the environment variables within it,
    // and then package description from package.json ... then add name of page at the end.
    let pageTitle = process.env.npm_package_description + ' - Travel';
    
    res.render('flowers', {title: pageTitle}); // render function
};

// export response
module.exports = {
    flowers
}