const express = require("express");
const routes = express.Router();
const prodController = require('../controllers/products');
const prodMiddlewares = require('../middlewares/prod');
const adminMiddelwares = require('../middlewares/admin');
const categMiddlewares = require("../middlewares/category");
routes.get('/all', prodController.getAllProds);
routes.get('/product-by-id/:id', prodController.getProdById);
routes.get('/product-by-category/:name', prodController.getProdsByCateg);
routes.post('/add-new', adminMiddelwares.isAdmin, categMiddlewares.isFind, prodMiddlewares.isValide, prodController.AddProd);
routes.post('/add-img/:id', adminMiddelwares.isAdmin, prodController.addImg);
routes.get('/categs', prodController.getCategs);
routes.post('/edit-prod/:pid', adminMiddelwares.isAdmin, categMiddlewares.isFind, prodMiddlewares.isValide, prodController.EditProd);
routes.post('/remove-img/:pid', adminMiddelwares.isAdmin, prodController.removeImg);
routes.get("/remove-prod/:id", adminMiddelwares.isAdmin, prodController.removeProd);
routes.get('/remove-categ/:id', adminMiddelwares.isAdmin, prodController.removeCateg);
routes.post('/edit-categ/:id', adminMiddelwares.isAdmin, prodController.editCateg);
module.exports = routes