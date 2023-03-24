const express = require("express");
const routes = express.Router();
const supplierControllers = require("../controllers/supplier");
const supplierMiddlewares = require('../middlewares/supplier');
routes.post('/signup', supplierMiddlewares.isValide, supplierControllers.signUp);
routes.post('/login', supplierControllers.logIn);
routes.post('/add-prods', supplierMiddlewares.isAuth, supplierControllers.addProds);
routes.post('/remove-prod', supplierMiddlewares.isAuth, supplierControllers.removeProd);
module.exports = routes;