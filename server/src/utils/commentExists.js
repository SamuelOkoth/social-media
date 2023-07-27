import { Connection } from "../helpers/dbHelpers.js";

const db = new Connection();

export const commentExists = async (CommentID) => {
  const { recordset } = await db.executeProcedure("GetComment", { CommentID });
  console.log(recordset)
  if(recordset[0]){
    return true
  }
  return false
};

