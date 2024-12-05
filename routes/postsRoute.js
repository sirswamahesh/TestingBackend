const express = require("express");
const { getPosts } = require("../controllers/postsController");
const { getUsers } = require("../controllers/usersController");

const router = express.Router();

// Route to get posts
router.get("/posts", getPosts);
router.get("/users", getUsers);

module.exports = router;