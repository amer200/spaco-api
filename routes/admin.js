const express = require("express");
const routes = express.Router();
const adminControllers = require("../controllers/admin");
const adminMiddelwares = require("../middlewares/admin");

routes.post("/login", adminMiddelwares.isAdmin, adminControllers.logIn);