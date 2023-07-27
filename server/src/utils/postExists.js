import { Connection } from "../helpers/dbHelpers.js";

const db = new Connection();

export const postExists = async (PostID) => {
  const { recordset } = await db.executeProcedure("GetPost", { PostID });
  if(recordset[0]){
    return true
  }
  return false
};