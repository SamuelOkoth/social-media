import { Router } from "express";

import { deleteUserMessage, getUserMessages } from "../controllers/messagingController.js";
import { loginRequired } from "../middllewares/loginRequired.js";


export const messageRouter = Router();

messageRouter
  .get("/:userID",loginRequired, getUserMessages)
  .delete("/:messageID", loginRequired, deleteUserMessage);