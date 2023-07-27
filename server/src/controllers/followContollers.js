import { Connection } from "../helpers/dbHelpers.js";

const db = new Connection();

export const saveFriend = async (req, res) => {
  try {
    const { userID: userID1 } = req.user;
    const { userID: userID2 } = req.params;
    const { recordset } = await db.executeProcedure("GetUserByID", {
      userID: userID2,
    });
    if (!recordset[0]) {
      return res.json({ message: `User with id ${userID2} doesnt exist` });
    }
    const { recordset: following } = await db.executeProcedure(
      "CheckIfFollowing",
      { userID1, userID2 }
    );
    if (following[0].IsFollowing === true) {
      return res.json({
        message: `You're friends with ${recordset[0].userName} already,send a message😎`,
      });
    }
    db.executeProcedure("SaveFriend", {
      userID1,
      userID2,
      requestStatus: "Accepted",
    });
    res.json({
      message: `You're following ${recordset[0].userName}, start sending messages now😎`,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const getYourFriends = async (req, res) => {
  try {
    const { userID } = req.user;
    const { recordset } = await db.executeProcedure("GetUserFriends", {
      userID,
    });
    if (!recordset[0]) {
      return res.json({ message: "You have no friends yet!" });
    }
    res.json({ friends: recordset });
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteFriendship = async (req, res) => {
  try {
    const { userID: userID1 } = req.user;
    const { userID: userID2 } = req.params;
    const { recordset: friendshipExists } = await db.executeProcedure(
      "CheckFriendshipExists",
      { userID1, userID2 }
    );
    if (!friendshipExists[0].FriendshipExists) {
      return res.json({ message: "Youre not friends" });
    }
    db.executeProcedure("DeleteFriendship", { userID1, userID2 });
    res.json({ message: "Friendship has been deleted" });
  } catch (error) {
    res.json(error.message);
  }
};
