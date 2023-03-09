const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    prods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    suppliers: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    Status: String,
})

module.exports = mongoose.model("Order", orderSchema);