const express = require('express');
const route = express.Router();
const loginController = require('./src/controllers/loginController');

// Rotas da home
route.get('/', loginController.index);
route.post("/register", loginController.register)
route.get("/contacts", loginController.contacts)

// Rotas de contato

module.exports = route;
