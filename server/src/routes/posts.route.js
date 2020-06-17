const express = require("express");
const app = new express();
const postRouter = express.Router();
const Post = require("../models/post.model");

// Get all posts
postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Create a post
postRouter.post("/", async (req, res) => {
  try {
    const { title, body, author } = req.body;
    const newPost = { title, body, author };
    const post = await Post.create(newPost);
    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = postRouter;
