const express = require("express");
const routes = express.Router();
const prodController = require('../controllers/products');
const prodMiddlewares = require('../middlewares/prod');
const supplierMiddlewares = require('../middlewares/supplier');
const userMiddlewares = require("../middlewares/user");
const categMiddlewares = require("../middlewares/category");
routes.get('/all', prodController.getAllProds);
routes.get('/product-by-id/:id', prodController.getProdById);
routes.get('/product-by-category/:name', prodController.getProdsByCateg);
routes.post('/add-new', supplierMiddlewares.isAuth, categMiddlewares.isFind, prodMiddlewares.isValide, prodController.AddProd);
routes.get('/categs', prodController.getCategs);
routes.post('/edit-prod/:pid', supplierMiddlewares.isAuth, categMiddlewares.isFind, prodMiddlewares.isValide, prodController.EditProd);
routes.post('/remove-img/:pid', supplierMiddlewares.isAuth, prodController.removeImg);
module.exports = routes