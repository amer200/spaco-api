const Supplier = require('../models/supplier');
const Prod = require('../models/product');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const salt = 10;
exports.signUp = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const taxrecord = req.body.taxrecord;
    const mobile = req.body.mobile;
    const address = req.body.address;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, salt);
    const status = 0;
    Supplier.findOne({ email: email })
        .then(s => {
            if (s) {
                res.status(400).json({
                    msg: 'this email is used before'
                })
            } else {
                const newSupplier = new Supplier({
                    name: name,
                    email: email,
                    taxrecord: taxrecord,
                    mobile: mobile,
                    password: hash,
                    address: address,
                    status: status
                })
                newSupplier.save()
                    .then(s => {
                        res.status(200).json({
                            supplier: s
                        })
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
exports.logIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Supplier.findOne({ email: email })
        .then(s => {
            if (s) {
                if (bcrypt.compareSync(password, s.password)) {
                    req.session.supplier = s._id;
                    const user = {
                        id: s._id,
                        name: s.name,
                        roll: "supplier"
                    }
                    const token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN);
                    res.status(200).json({
                        msg: "ok",
                        token: token
                    })
                } else {
                    res.status(400).json({
                        msg: "wrong password or email"
                    })
                }
            } else {
                res.status(400).json({
                    msg: "wrong password or email"
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
exports.addProds = (req, res) => {
    const prodId = req.body.id;
    const supId = req.user.id;
    Supplier.findById(supId)
        .then(s => {
            s.prods.push(prodId);
            return s.save()
        })
        .then(s => {
            return Prod.findById(prodId);
        })
        .then(p => {
            p.suppliers.push(supId);
            return p.save()
        })
        .then(resu => {
            res.status(200).json({
                msg: "ok"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}
exports.removeProd = (req, res) => {
    const prodId = req.body.id;
    const supId = req.user.id;
    Supplier.findById(supId)
        .then(s => {
            s.prods = s.prods.filter(p => {
                return p != prodId
            })
            return s.save()
        })
        .then(s => {
            return Prod.findById(prodId)
        })
        .then(p => {
            p.suppliers = p.suppliers.filter(s => {
                return s != supId
            })
            return p.save();
        })
        .then(s => {
            res.status(200).json({
                msg: "ok"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}
exports.getProds = (req, res) => {
    const supId = req.user.id;
    Supplier.findById(supId).populate("prods")
        .then(s => {
            res.status(200).json({
                products: s.prods
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}