/* Required for seedgoose functionality */

module.exports = {
    modelBaseDirectory: 'app_api/models',    // tell seedgoose where the 'models' directory is for schemas
    models: ['*.js','!db.js'],  // tell seedgoose which models to look at (all .js files in 'models' except for db.js)
    data: 'data',   // tell seedgoose where the data is (specific seedgoose JSON format, see seedgoose website for details)
    db: 'mongodb://localhost:27017/floweringspaces' // give seedgoose the database location
};