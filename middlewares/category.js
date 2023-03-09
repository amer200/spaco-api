const categ = require("../models/category");

exports.isFind = (req, res) => {
    console.log(req.body)
    const category = req.body.category;
    categ.findOne({ name: category })
        .then(c => {
            if (c) {
                next()
            } else {
                res.status(400).json({
                    msg: "categore not found !"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "server error",
                error: err.msg
            })
        })
}