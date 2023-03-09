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
    Supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
})

module.exports = mongoose.model('Product', productSchema);