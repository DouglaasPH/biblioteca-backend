import mysql from "mysql2";

const connection = mysql.createPool({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "rootpassword",
  database: "mydatabase",
});

export default connection;
