const { async } = require("regenerator-runtime")
const Login = require("../models/LoginModel")

module.exports = {
  index: (req, res) => {
    res.render("login-register")
  },
  register: async(req, res) => {
    const login = new Login(req.body);

    try {
      await login.register()
      if(login.errors.length>0) {
        req.flash("errors", login.errors);
        req.session.save(() => {
          return res.redirect("back")
        })
        return;
      }
      
      req.flash("success", "Usuário cadastrado com sucesso!")
      req.session.save(() => {
        return res.redirect("back");
      })
    } catch (error) {
      return res.render("404")
    }
  },
  contacts: (req, res) => {
    res.render("contacts")
  }
}