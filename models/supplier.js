const mongoose = require('mongoose');

const supplierShema = mongoose.Shema({
    name: String,
    password: String,
    email: String,
    mobile: String,
    address: String,
    taxrecord: String,
    prods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
})

module.exports = mongoose.model('Supplier', supplierShema);