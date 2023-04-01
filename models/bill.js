const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    prods: [
        {
            prod: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantaty: Number,
            suppliers: [
                {
                    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
                    price: Number
                }
            ]
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model("Bill", billSchema)