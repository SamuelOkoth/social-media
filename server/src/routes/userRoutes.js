import { Router } from "express";

import { loginRequired } from "../middllewares/loginRequired.js";
import { getAllUsers } from "../controllers/userControllers.js";

export const userRouter = Router();

userRouter.get("/", loginRequired, getAllUsers);
