const express = require("express");
const { userById, allusers,getUser, updateUser, deleteUser } = require("../controller/user");
const { requireSignin } = require('../controller/auth');
const router = express.Router();

router.get("/users", allusers);
router.get("/user/:userId",requireSignin,getUser);
router.put("/user/:userId",requireSignin,updateUser);
router.delete("/user/:userId",requireSignin,deleteUser);


// any routes containing :userId , our app will first executee by userByid
router.param("userId",userById);

module.exports = router;
