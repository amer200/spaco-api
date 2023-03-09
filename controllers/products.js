const Prod = require('../models/product');
const Categ = require('../models/category');

exports.getAllProds = (req, res) => {
    Prod.find().populate('category')
        .then(prods => {
            res.status(200).json({
                data: prods
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: "server error",
                error: err.msg
            })
        })
}
exports.getProdsByCateg = (req, res) => {
    const name = req.params.name;
    Categ.findOne({ name: name })
        .populate("products")
        .then(c => {
            if (c) {
                res.status(200).json({
                    data: c.products
                })
            } else {
                res.status(401).json({
                    msg: "not found !"
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
exports.getProdById = (req, res) => {
    const id = req.params.id;
    Prod.findById(id)
        .populate('category')
        .then(p => {
            if (p) {
                res.status(200).json({
                    data: p
                })
            } else {
                res.status(401).json({
                    msg: "not found !"
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
exports.AddProd = (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description;
    const details = req.body.details;
    const imgs = req.files;
    let imgsPath = [];
    if (!imgs.path[0]) {
        return res.status(304).json({
            msg: "imgs is required",
        })
    }
    imgs.forEach(i => {
        imgsPath.push(i.path)
    });
    const newProd = new Prod({
        name: name,
        category: category,
        supplier: req.session.supplier,
        description: description,
        details: details,
        imgs: imgsPath
    })
    newProd.save()
        .then(p => {
            res.status(200).json({
                data: p
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: "server error",
                error: err.msg
            })
        })
}