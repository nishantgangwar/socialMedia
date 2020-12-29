const express = require("express");
const { requireSignin } = require("../controller/auth");
const router = express.Router();
const { userById } = require("../controller/user");
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
} = require("../controller/post");
const { createPostValidator } = require("../Validators/index");
router.get("/posts", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,

  createPost,
  createPostValidator
);

router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.get("/posts/by/:userId", requireSignin, postByUser);


// any routes containing :userId , our app will first executee by userByid
router.param("userId", userById);
// any routes containing :userId , our app will first executee by userByid
router.param("postId", postById);
module.exports = router;
