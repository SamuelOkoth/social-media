import { Connection } from "../helpers/dbHelpers.js";

const db = new Connection();

export const getAllUsers = async (req, res) => {
  try {
    const { recordset } = await db.executeProcedure("GetUsers");
    res.json({ users: recordset });
  } catch (error) {
    res.json(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    // const { userID } = req.user;
    // const { updatedData } = req.body;
    // await db.executeProcedure("UpdateUser", { userID, ...updatedData });
    // res.json({ message: "User updated successfully" });
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    // const { userID } = req.user;
    // await db.executeProcedure("DeleteUser", { userID });
    // res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.json(error.message);
  }
};
