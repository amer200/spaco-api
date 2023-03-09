const Categ = require("../models/category");
exports.logIn = (req, res) => {
    const password = req.body.password;
    console.log(process.env.ADMINPASS)
    if (password == process.env.ADMINPASS) {
        req.session.admin = true;
        res.status(200).json({
            msg: "ok"
        })
    } else {
        res.status(304).json({
            msg: "wrong pass"
        })
    }
}
exports.logOut = async (req, res) => {
    await req.session.destroy()
    res.status(200).json({
        msg: "ok"
    })
}
exports.addCateg = (req, res) => {
    const name = req.body.name;
    const img = req.file;
    if (!name || typeof name != "string" || name.length < 4) {
        return res.status(400).json({
            msg: "category name is requires , must be typeof string and lenth > 4"
        })
    }
    if (!img) {
        return res.status(400).json({
            msg: "img is required"
        })
    }
    Categ.findOne({ name: name })
        .then(c => {
            if (c) {
                return res.status(400).json({
                    msg: "this name is used"
                })
            } else {
                const newCateg = new Categ({
                    name: name,
                    img: img.path
                })
                newCateg.save()
                    .then(c => {
                        return res.status(200).json({
                            category: c
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