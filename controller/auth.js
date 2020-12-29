const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const expressJwt = require("express-jwt");
exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error: "Email is Taken already",
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ user });
};

exports.signin = (req, res) => {
  // find the use based on email address
  const { email, password } = req.body;
  User.findOne({ email },(error, user) => {
    // if error no user
    if (error || !user) {
      return res.status(401).json({
        error: "User with that email does not exist please signup first",
      });
    }
    // id user is found make sure the email and password are found in//
    // create authenticate method in models
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password do not match" });
    }
    // if error or no user
    
    // if user , authenticate

    // generate a token with user id and secret id

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as 't' i cookie with expiry date

    res.cookie("t", { expire: new Date() + 9999 });

    // return response with user and token
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};



exports.signout =(req,res) => {
    res.clearCookie("t");
    return res.json({message:"Signout Success!"});
}

exports.requireSignin = expressJwt({
  // if the token is valid , express jwt appends the verfied user id

    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });