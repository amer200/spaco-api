const express = require("express");
const routes = express.Router();
const billController = require('../controllers/bill');
const userMiddlewares = require('../middlewares/user');

routes.post('/add-new', userMiddlewares.isAuth, billController.addNew);


module.exports = routes;