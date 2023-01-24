const express = require('express');
const route = express.Router();
const loginController = require('./src/controllers/loginController');
const contactController = require("./src/controllers/contactController")
const {checkLogin} = require("./src/middlewares/middleware")
// Rotas da home
route.get('/', loginController.index);
route.post("/register", loginController.register)
route.post("/login", loginController.login)
route.get("/logout", loginController.logout)

//Rotas do contacts
route.get("/contacts", checkLogin, contactController.index)
route.get("/contact/register", checkLogin, contactController.register)
route.post("/contact/create", checkLogin, contactController.create)
route.get("/contact/edit/:id", checkLogin, contactController.editIndex)
route.post("/contact/edit/:id", checkLogin, contactController.edit)
route.get("/contact/delete/:id",checkLogin, contactController.delete)

// Rotas de contato

module.exports = route;
