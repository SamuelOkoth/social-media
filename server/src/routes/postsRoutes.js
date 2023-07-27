import { Router } from "express";

import { deletePost, getConnectedUserPosts, savePost, updatePost } from "../controllers/postControllers.js";
import { loginRequired } from "../middllewares/loginRequired.js";

export const postsRouter = Router();

postsRouter
  .get("/",loginRequired, getConnectedUserPosts)
  .post("/", loginRequired,savePost)
  .delete("/:postID",loginRequired, deletePost)
  .put("/:postID",loginRequired, updatePost);
