const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
       type: Number,
       required: true
    },
    description: {
        type: String,
        required: true
    }
})


module.exports.Product = mongoose.model("product", productSchema);
