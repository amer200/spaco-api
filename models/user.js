const { number } = require('joi');
const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    mobile: String,
    address: String,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    status: Boolean
})

module.exports = mongoose.model('User', userShema);