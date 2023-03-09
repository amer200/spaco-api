const Supplier = require('../models/supplier');
const bcrypt = require('bcrypt');
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
                    res.status(200).json({
                        msg: "ok"
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