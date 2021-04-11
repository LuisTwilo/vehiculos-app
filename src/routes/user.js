const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");

const validateEmail = async (email) => {
  const emailUser = await User.findOne({ email }).lean();
  if (emailUser) throw "Email ya está en uso";
  return;
};

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });
  try {
    await validateEmail(email);
    user.password = await user.encryptPassword(password);
    const newUser = await user.save();
    res.redirect("/user/login");
  } catch (err) {
    res.render("users/register", {
      err,
      firstName,
      lastName,
      email,
      password,
    });
  }
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/vehicle",
    failureRedirect: "/user/login",
    failureFlash: true,
  })
);

router.get('/logout', (req, res) =>{
  req.logout();
  res.redirect('/');
})

module.exports = router;
