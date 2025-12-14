import connection from "../config/db.js";

const getAll = async () => {
  const execute = await connection.query(`
    SELECT
      books.id AS book_id,
      books.title,
      books.year,
      books.category,
      books.author_id,
      books.created_at,
      books.updated_at,
      authors.name AS author_name
    FROM books
    INNER JOIN authors
      ON books.author_id = authors.id
      `);
  return execute[0][0];
};

const getById = async (id) => {
  const execute = await connection.query(
    `
    SELECT
      books.id AS book_id,
      books.title,
      books.year,
      books.category,
      books.author_id,
      books.created_at,
      books.updated_at,
      authors.name AS author_name
    FROM books
    INNER JOIN authors
      ON books.author_id = authors.id
    WHERE books.id = ?
      `,
    [id]
  );
  return execute[0][0];
};

const create = async (data) => {
  const execute = await connection.query(
    "INSERT INTO books (title, year, category, author_id) VALUES (?, ?, ?, ?)",
    [data.title, data.year, data.category, data.author_id]
  );
  return execute;
};

const update = async (id, data) => {
  const execute = await connection.query(
    "UPDATE books SET title = ?, year = ?, category = ?, author_id = ? WHERE id = ?",
    [data.title, data.year, data.category, data.author_id, id]
  );
  return execute[0].affectedRows;
};

const remove = async (id) => {
  const execute = await connection.query("DELETE FROM books WHERE id = ?", [
    id,
  ]);
  return execute[0].affectedRows;
};

export { getAll, getById, create, update, remove };
