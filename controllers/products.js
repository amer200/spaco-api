const Prod = require('../models/product');
const Categ = require('../models/category');
const User = require('../models/user');
const fs = require("fs");
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
                error: err.message
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
                error: err.message
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
                error: err.message
            })
        })
}
exports.AddProd = (req, res) => {
    const { name, category, description, ...d } = req.body

    let details = []
    // for (let i in d) {
    //     details.push({ title: decodeURI(i), value: d[i] })
    // }
    for (let i = 0; i < (d.length / 2); i++) {
        details.push({ title: d[`title${i}`], value: d[`value${i}`] })
    }

    const imgs = req.files;


    let imgsPath = [];
    if (!imgs[0]) {
        return res.status(304).json({
            msg: "imgs is required",
        })
    }
    imgs.forEach(i => {
        imgsPath.push(i.path)
    });
    console.log(req.user)
    const newProd = new Prod({
        name: name,
        category: category,
        description: description,
        details: details,
        imgs: imgsPath
    })
    newProd.save()
        .then(p => {
            Categ.findOne({ name: category })
                .then(c => {
                    c.products.push(p)
                    return c.save()
                })
                .then(c => {
                    res.status(200).json({
                        data: p
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                msg: "server error",
                error: err
            })
        })
}
exports.getCategs = (req, res) => {
    Categ.find({}, 'name , img')
        .then(c => {
            res.status(200).json({
                data: c
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: "server error",
                error: err
            })
        })
}
exports.EditProd = (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description;
    const details = req.body.details;
    const prodId = req.params.pid;
    const supId = req.user.id;
    const newImgs = req.files;
    Prod.findOne({ _id: prodId, supplier: supId })
        .then(p => {
            if (p) {
                p.name = name;
                p.category = category;
                p.description = description;
                p.details = details;
                if (newImgs[0]) {
                    newImgs.forEach(i => {
                        p.imgs.push(i.path);
                    })
                }
                return p.save()
            } else {
                return false;
            }
        })
        .then(result => {
            if (result) {
                res.status(200).json({
                    product: result
                })
            } else {
                res.status(400).json({
                    msg: "product not found (product id or supplier id wrong)"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}
exports.removeImg = (req, res) => {
    const prodId = req.params.pid;
    const img = req.body.img;
    const supId = req.user.id;
    Prod.findOne({ _id: prodId, supplier: supId })
        .then(p => {
            if (p) {
                const newImgs = p.imgs.filter(i => {
                    return i != img
                })
                p.imgs = newImgs
                p.save()
                    .then(p => {
                        res.status(200).json({
                            imgs: p.imgs
                        })
                    })
            } else {
                res.status(400).json({
                    msg: "product not found (product id or supplier id wrong)"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}