import connection from "../config/db.js";

const getAll = () => {
  const execute = connection.query(`
    SELECT
      books.id,
      books.title,
      books.year,
      books.category,
      authors.name AS author_name
    FROM books
    INNER JOIN authors
      ON books.author_id = authors.id
      `);
  return execute;
};

const getById = (id) => {
  const execute = connection.query(
    `
    SELECT
      books.id,
      books.title,
      books.year,
      books.category,
      authors.name AS author_name
    FROM books
    INNER JOIN authors
      ON books.author_id = authors.id
    WHERE books.id = ?
      `,
    [id]
  );
  return execute;
};

const create = (data) => {
  const execute = connection.query(
    "INSERT INTO books (title, year, category, author_id) VALUES (?, ?, ?, ?)",
    [data.title, data.year, data.category, data.author_id]
  );
  return execute;
};

const update = (id, data) => {
  const execute = connection.query(
    "UPDATE books SET title = ?, year = ?, category = ?, author_id = ? WHERE id = ?",
    [data.title, data.year, data.category, data.author_id, id]
  );
  return execute;
};

const remove = (id) => {
  const execute = connection.query("DELETE FROM books WHERE id = ?", [id]);
  return execute;
};

export { getAll, getById, create, update, remove };
