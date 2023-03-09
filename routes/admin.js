const express = require("express");
const routes = express.Router();
const adminControllers = require("../controllers/admin");
const adminMiddelwares = require("../middlewares/admin");

routes.post("/login", adminControllers.logIn);
routes.get("/logout", adminMiddelwares.isAdmin, adminControllers.logOut);
routes.post("/add-new-category", adminMiddelwares.isAdmin, adminControllers.addCateg);
module.exports = routes