const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    description: String,
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }],
    imgs: [String],
    details: [
        {
            title: String,
            value: String
        }
    ],
})

module.exports = mongoose.model('Product', productSchema);