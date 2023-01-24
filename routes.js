const express = require('express');
const route = express.Router();
const loginController = require('./src/controllers/loginController');
const {checkLogin} = require("./src/middlewares/middleware")
// Rotas da home
route.get('/', loginController.index);
route.post("/register", loginController.register)
route.post("/login", loginController.login)
route.get("/logout", loginController.logout)
route.get("/contacts", checkLogin, loginController.contacts)

// Rotas de contato

module.exports = route;
