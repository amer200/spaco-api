const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    prod: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number, //for one item
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    supplerresponse: Boolean,
    userresponse: Boolean
})

module.exports = mongoose.model("Order", orderSchema)