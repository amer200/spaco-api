exports.isAdmin = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.status(304).json({
            msg: "not allowed"
        })
    }
}