const Joi = require('joi');

const prodSchema = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
});

exports.isValide = (req, res, next) => {
    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description;
    const result = prodSchema.validate({
        name: name,
        category: category,
        description: description,
    })
    if (result) {
        next();
    } else {
        console.log(result);
    }
}
