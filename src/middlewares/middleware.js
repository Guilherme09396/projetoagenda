const middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.userLogado = req.session.user;
  res.locals.navContact = false
  next();
};

const checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
};

const csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

const checkLogin = (req, res, next) => {
  if(!req.session.user) {
    req.flash("errors", "Você precisa estar logado para acessar esta rota!")
    req.session.save(() => {
      return res.redirect("/")
    })
    return;
  }

  next();
}

module.exports = {middlewareGlobal, checkCsrfError, csrfMiddleware, checkLogin}