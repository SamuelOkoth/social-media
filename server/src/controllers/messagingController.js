import { Connection } from "../helpers/dbHelpers.js";

const db = new Connection();

export const getUserMessages = async (req, res) => {
  try {
    const { userID } = req.params;
    const { recordset } = await db.executeProcedure("GetUserMessages", {
      userID,
    });
    if (!recordset[0]) {
      return res.json({ message: "No received messages" });
    }
    res.json({ messages: recordset });
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteUserMessage = async (req, res) => {
  try {
    const { messageID } = req.params;
    const { userID } = req.user;
    console.log(messageID, userID);
    db.executeProcedure("DeleteMessage", { messageID, userID });
    res.json({ message: "Message has been deleted" });
  } catch (error) {
    res.json(error.message);
  }
};
