const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const salt = 10;

exports.signUp = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const address = req.body.address;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, salt);
    const status = 0;
    User.findOne({ email: email })
        .then(u => {
            if (u) {
                res.status(400).json({
                    msg: 'this email is used before'
                })
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: hash,
                    address: address,
                    status: status
                })
                newUser.save()
                    .then(u => {
                        res.status(200).json({
                            user: u
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
    User.findOne({ email: email })
        .then(u => {
            if (u) {
                if (bcrypt.compareSync(password, u.password)) {
                    req.session.user = u._id;
                    const user = {
                        id: u._id,
                        name: u.name,
                        roll: "user"
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