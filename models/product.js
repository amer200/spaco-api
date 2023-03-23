const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    description: String,
    imgs: [String],
    details: [
        {
            title: String,
            value: String
        }
    ],
})

module.exports = mongoose.model('Product', productSchema);