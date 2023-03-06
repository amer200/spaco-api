const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
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