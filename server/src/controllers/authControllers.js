import { Connection } from "../helpers/dbHelpers.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


const db = new Connection();

export const signup = async (req, res) => {
  try {
    let { userName, fullname, email, password } = req.body;
    const { recordset } = await db.executeProcedure("GetUser", { userName });
    if (recordset.length > 0) {
      return res.json({ error: "Account already exists,use another username!" });
    }
    password = bcrypt.hashSync(password, 10);
    await db.executeProcedure("SaveUser", {
      userName,
      fullname,
      email,
      password,
    });
    res.json({ message: "Account created successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    let { userName, password } = req.body;
    const user = (await db.executeProcedure("GetUser", { userName })).recordset;
    if (!user[0]) {
      return res.json({ error: "Account doesnt exist!" });
    }
    const validpassword = bcrypt.compareSync(password, user[0].password);
    if (!validpassword) {
      return res.json({ error: "Try again with another password!" });
    }
    const payload = user.map((item) => {
      const { password, ...rest } = item;
      return rest;
    });
    const token = jwt.sign(payload[0], process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
