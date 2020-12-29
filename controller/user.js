const User = require("../models/user");
const _ = require('lodash')
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User Not Found" });
    }
    req.profile = user; // adds profile object in req with user info
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res
      .status(403)
      .json({ error: "User is not authorized to perform this action" });
  }
};

exports.allusers = (req, res) => {
  User.find((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ user});
  }).select("name email created")
};


exports.getUser =(req,res) => {
  req.profile.hashed_password =undefined;
  req.profile.salt=undefined;
  return res.json(req.profile)
}


exports.updateUser = (req,res,next) => {
  let user = req.profile
  user = _.extend(user, req.body) // extend --- mutate the source object
  user.updated = Date.now()
  user.save((err) =>{
    if(err){
      return res.status(400).json({
        error:"You are notauthorized to perform this action"
      })
    }
    req.profile.hashed_password =undefined;
    req.profile.salt=undefined;
    res.json({user})
  })
}

exports.deleteUser = (req, res, next) => {
 let user =req.profile
 user.remove((err,user)=> {
   if(err) {
     return res.status(400).json({ error:err})
   }
   
   res.json({message:"User Is deleted Successfully"})
 })
}