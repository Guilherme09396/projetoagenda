const { async } = require("regenerator-runtime")
const Login = require("../models/LoginModel")

module.exports = {
  index: (req, res) => {
    res.render("login-register")
    console.log(req.session)
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
  login: async(req, res) => {
    const login = new Login(req.body);

    try {
      await login.login();

      if(login.errors.length>0) {
        req.flash("errors", login.errors);
        req.session.save(() => {
          return res.redirect("back")
        })
        return;
      }

      req.flash("success", "Login efetuado com sucesso!")
      req.session.user = login.user
      req.session.save(() => {
        return res.redirect("/")
      })
    } catch (error) {
      return res.render("404")
    }
  },
  logout: async(req, res) => {
    await req.session.destroy();
    return res.redirect("/")
  },
  contacts: (req, res) => {
    res.render("contacts")
  }
}