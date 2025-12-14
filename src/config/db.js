import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "rootpassword",
  database: "biblioteca_db",
});

export default connection;
