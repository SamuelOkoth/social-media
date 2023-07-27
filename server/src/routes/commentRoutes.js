import { Router } from "express";

import { loginRequired } from "../middllewares/loginRequired.js";
import { deleteComment, getComments, saveComment } from "../controllers/comments.controllers.js";

export const commentsRouter = Router();

commentsRouter
  .get("/:postID", loginRequired,getComments)
  .post("/:postID/",loginRequired, saveComment)
  .delete("/:commentID",loginRequired, deleteComment);