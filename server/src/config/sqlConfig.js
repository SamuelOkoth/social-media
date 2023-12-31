import dotenv from "dotenv";
dotenv.config();

const { USER, PASSWORD, SERVER, DATABASE } = process.env 

export const sqlConfig = {
  user: USER ,
  password: PASSWORD,
  server: SERVER,
  database: DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

