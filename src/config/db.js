import mysql from "mysql2";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "26042007",
  database: "biblioteca",
});

export default connection;
