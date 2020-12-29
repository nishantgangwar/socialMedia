const express = require("express");
const { signup, signin, signout } = require("../controller/auth");
const { userById } = require("../controller/user");
const { userSignupValidator } = require("../Validators/index");
const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);


// any routes containing :userId , our app will first executee by userByid
router.param("userId",userById);

module.exports = router;
