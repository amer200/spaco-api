const categ = require("../models/category");

exports.isFind = (req, res, next) => {
    const category = req.body.category;
    categ.findOne({ name: category })
        .then(c => {
            if (c) {
                next()
            } else {
                res.status(400).json({
                    msg: "category not found !"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}