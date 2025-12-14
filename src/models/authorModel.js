import connection from "../config/db.js";

const getAll = async () => {
  const rows = await connection.query("SELECT * FROM authors");
  return rows[0][0];
};

const getById = async (id) => {
  const rows = await connection.query("SELECT * FROM authors WHERE id = ?", [
    id,
  ]);
  return rows[0][0];
};

const create = async (data) => {
  const rows = await connection.query(
    "INSERT INTO authors (name, nationality) VALUES (?, ?)",
    [data.name, data.nationality]
  );
  return rows;
};

const update = async (id, data) => {
  const execute = await connection.query(
    "UPDATE authors SET name = ?, nationality = ? WHERE id = ?",
    [data.name, data.nationality, id]
  );
  return execute[0].affectedRows;
};

const remove = async (id) => {
  const execute = await connection.query("DELETE FROM authors WHERE id = ?", [
    id,
  ]);
  return execute[0].affectedRows;
};

export { getAll, getById, create, update, remove };
