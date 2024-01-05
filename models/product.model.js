const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    "id": {type: String},
    "saucer_name": {type: String},
    "category" : {type: String},
    "description" : {type: String},
    "price" : {type: Number},
    "photo" : {type: String},
})

module.exports = mongoose.model('Product', ProductSchema, 'Product');