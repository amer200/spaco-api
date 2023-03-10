const jwt = require("jsonwebtoken");
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const suppSchema = Joi.object({
    name: Joi.string().min(3).required(),
    mobile: Joi.string().min(12).required(),
    email: Joi.string().email().required(),
    taxrecord: Joi.string().required(),
    address: Joi.string(),
    password: joiPassword.string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .min(8)
        .required(),
});

exports.isValide = (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const taxrecord = req.body.taxrecord;
        const mobile = req.body.mobile;
        const address = req.body.address;
        const password = req.body.password;
        const result = suppSchema.validate({
            name: name,
            email: email,
            password: password,
            taxrecord: taxrecord,
            mobile: mobile,
            address: address
        })
        if (result.error) {
            res.status(400).json({
                msg: result.error
            })
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({
            msg: "server error",
            error: err.msg
        })
    }
}
exports.isAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({
            msg: "token is requires"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(400).json({
                msg: err
            })
        }
        if (user.user.roll == 'supplier') {
            req.user = user.user
            next();
        } else {
            console.log(user.user.roll)
            res.status(304).json({
                msg: "not allowed"
            })
        }
    })
}