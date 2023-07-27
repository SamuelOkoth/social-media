import { commentExists } from "../utils/commentExists.js";
import { Connection } from "../helpers/dbHelpers.js";
import { postExists } from "../utils/postExists.js";

const db = new Connection();

export const getComments = async (req, res) => {
  try {
    const { postID } = req.params;
    const { userID } = req.user;
    if (!(await postExists(postID))) {
      return res.json({ error: "Post may have been deleted!!" });
    }
    const { recordset } = await db.executeProcedure("GetPostComments", {
      postID,
    });
    if (!recordset[0]) {
      return res.json({ message: "No comments yet" });
    }
    res.json({ comments: recordset });
  } catch (error) {
    res.json(error.message);
  }
};

// comment
export const saveComment = async (req, res) => {
  try {
    const { commentText } = req.body;
    const { postID } = req.params;
    const { userID } = req.user;
    if (!(await postExists(postID))) {
      return res.json({ error: "Post may have been deleted😁" });
    }
    db.executeProcedure("SaveComment", { userID, postID, commentText });
    res.json({ message: "Comment has been saved" });
  } catch (error) {
    res.json(error.message);
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    if (!(await commentExists(commentID))) {
      return res.json({ error: "Comment is already deleted!!" });
    }
    db.executeProcedure("DeleteComment", { commentID });
    res.json({ message: "Comment has been deleted" });
  } catch (error) {
    res.json(error);
  }
};
