const User = require("../models/user.js");

module.exports.renderSingupForm = (req, res) => {
  res.render("../views/users/singup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listing");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("../views/users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust!");
  let redirecturl = res.locals.redirectUrl || "/listing";
  res.redirect(redirecturl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out now");
    res.redirect("/listing");
  });
};
