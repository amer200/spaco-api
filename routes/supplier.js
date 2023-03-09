const express = require("express");
const routes = express.Router();
const supplierControllers = require("../controllers/supplier");
const supplierMiddlewares = require('../middlewares/supplier');
routes.post('/signup', supplierMiddlewares.isValide, supplierControllers.signUp);
routes.post('/login', supplierControllers.logIn);
module.exports = routes;