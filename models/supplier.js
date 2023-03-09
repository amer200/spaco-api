const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    mobile: String,
    taxrecord: String,
    prods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    status: Boolean,
})

module.exports = mongoose.model('Supplier', supplierSchema);