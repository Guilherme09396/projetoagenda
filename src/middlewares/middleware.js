const middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
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

module.exports = {middlewareGlobal, checkCsrfError, csrfMiddleware}