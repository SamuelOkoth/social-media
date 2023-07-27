import { Connection } from "../helpers/dbHelpers.js";
import { postExists } from "../utils/postExists.js";

const db = new Connection();

export const saveLike = async (req, res) => {
  try {
    const { postID } = req.params;
    const { userID } = req.user;
    if (!(await postExists(postID))) {
      return res.json({ error: "Post may have been deleted!!" });
    }
    await db.executeProcedure("SaveLike", { userID, postID });
    res.json({ message: "Like posted successfully" });
  } catch (error) {
    res.json(error.message);
  }
};

export const getLikesCount = async (req, res) => {
  try {
    const { postID } = req.params;
    const { userID } = req.user;
    if (!(await postExists(postID))) {
      return res.json({ error: "Post may have been deleted!!" });
    }
    const { recordset } = await db.executeProcedure("isLikedAndCount", {
      postID,
      userID,
    });
    res.json({ likes: recordset[0] });
  } catch (error) {
    res.json(error.message);
  }
};
