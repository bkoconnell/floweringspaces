// dependencies
const mongoose = require('mongoose');

// define the flowers schema
const flowerSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    latin: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    cost: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }    
});

// call 'model' method, pass name of collection (flowers) & definition (flowerSchema)
mongoose.model('flowers', flowerSchema);