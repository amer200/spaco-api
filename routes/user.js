const express = require("express");
const routes = express.Router();
const userControllers = require("../controllers/user");
const userMiddlewares = require('../middlewares/user');
routes.post('/signup', userMiddlewares.isValide, userControllers.signUp);
routes.post('/login', userControllers.logIn);
module.exports = routes;