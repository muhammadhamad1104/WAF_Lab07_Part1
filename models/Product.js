//models/Product.js
const mongoose = require('mongoose');
const { type } = require('os');

const productSchema = new mongoose.Schema({
    Product_Name: { type: String, required: true },
    Firm_Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    Expiry_Date: {type: Date, required: true}
}, {collection: 'products'});

module.exports = mongoose.model('products', productSchema);