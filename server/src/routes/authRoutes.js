import { Router } from "express";

import { login, signup } from "../controllers/authControllers.js";

export const authRouter = Router();

authRouter.post("/login", login).post("/signup", signup);
