import { Connection } from '../helpers/dbHelpers.js';
import {postExists} from '../utils/postExists.js'

const db = new Connection(); 

// GET ALL POSTS FROM CONNECTED USERS
export const getConnectedUserPosts = async (req, res) => {
  try {
    const { userID } = req.user;
    const { recordset } = await db.executeProcedure("GetConnectedUserPosts", { userID });
    if (!recordset[0]) {
      return res.json({ message: "No posts yet😎." });
    }
    res.json({ posts: recordset });
  } catch (error) {
    res.json(error.message);
  }
};

// SAVE A POST
export const savePost = async (req, res) => {
  try {
    const { content, imgUrl } = req.body;
    const { userID } = req.user;
    await db.executeProcedure("SavePost", { userID, content, imgUrl });
    res.json({ message: "Post created successfully" });
  } catch (error) {
    res.json(error.message);
  }
};

// DELETE A POST
export const deletePost = async (req, res) => {
  try {
    const { postID } = req.params;
    const { userID } = req.user; //logged in user from token
    if (!(await postExists(postID))) {
      return res.json({ error: "Post may have been deleted😁" });
    }
    await db.executeProcedure("DeletePost", { postID });
    res.json({ message: "Post deleted successfully✅." });
  } catch (error) {
    res.json(error.message);
  }
};

// UPDATE A POST
export const updatePost = async (req, res) => {
  try {
    const { postID } = req.params;
    const { userID } = req.user; //logged in user from token
    const { content, imgUrl } = req.body;
    if (!(await postExists(postID))) {
      res.json({ error: "Post may have been deleted😁" });
    }
    db.executeProcedure("UpdatePost", { postID, content, imgUrl, userID });
    res.json({ message: "Post has been updated successfully✅." });
  } catch (error) {
    res.json(error.message);
  }
};
