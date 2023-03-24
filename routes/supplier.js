const express = require("express");
const routes = express.Router();
const supplierControllers = require("../controllers/supplier");
const supplierMiddlewares = require('../middlewares/supplier');
routes.post('/signup', supplierMiddlewares.isValide, supplierControllers.signUp);
routes.post('/login', supplierControllers.logIn);
routes.post('/add-prod', supplierMiddlewares.isAuth, supplierControllers.addProd);
module.exports = routes;