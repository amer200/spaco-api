const express = require("express");
const routes = express.Router();
const prodController = require('../controllers/products');


routes.get('/all', prodController.getAllProds);
routes.get('/:id', prodController.getProdById);
routes.get('/product-by-category/:name', prodController.getProdsByCateg);
routes.get('')
module.exports = routes