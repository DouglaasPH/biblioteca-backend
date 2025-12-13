import connection from "../config/db";

const getAll = () => {
  const execute = connection.query("SELECT * FROM authors");
  return execute;
};

const getById = (id) => {
  const execute = connection.query("SELECT * FROM authors WHERE id = ?", [id]);
  return execute;
};

const create = (data) => {
  const execute = connection.query(
    "INSERT INTO authors (name, nationality) VALUES (?, ?)",
    [data.name, data.nationality]
  );
  return execute;
};

const update = (id, data) => {
  const execute = connection.query(
    "UPDATE authors SET name = ?, nationality = ? WHERE id = ?",
    [data.name, data.nationality, id]
  );
  return execute;
};

const remove = (id) => {
  const execute = connection.query("DELETE FROM authors WHERE id = ?", [id]);
  return execute;
};

export { getAll, getById, create, update, remove };
