const mongoose = require("mongoose");

const categoryShema = mongoose.Schema({
    name: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    img: String
})

module.exports = mongoose.model("Category", categoryShema);