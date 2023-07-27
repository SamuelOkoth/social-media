import { Router } from "express";

import { loginRequired } from "../middllewares/loginRequired.js";
import { getLikesCount, saveLike } from "../controllers/likeControllers.js";

export const likesRouter = Router();

likesRouter.get("/:postID",loginRequired, getLikesCount).post("/:postID",loginRequired, saveLike);

