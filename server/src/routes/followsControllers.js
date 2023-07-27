import { Router } from "express";

import { loginRequired } from "../middllewares/loginRequired.js";
import { deleteFriendship, getYourFriends, saveFriend } from "../controllers/followContollers.js";
  

export const friendsRouter = Router();

friendsRouter
  .get("/", loginRequired, getYourFriends)
  .post("/:userID", loginRequired, saveFriend)
  .delete("/:userID", loginRequired, deleteFriendship);

