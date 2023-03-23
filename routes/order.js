const express = require("express");
const routes = express.Router();
const orderController = require('../controllers/order');
const userMiddlewares = require('../middlewares/user');

routes.post('/add-new', userMiddlewares.isAuth, orderController.addOrder);


module.exports = routes;