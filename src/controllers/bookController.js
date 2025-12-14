import * as BookModel from "../models/bookModel.js";

const list = (req, res) => {
  BookModel.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const get = (req, res) => {
  BookModel.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

const create = (req, res) => {
  if (
    !req.body.title ||
    !req.body.year ||
    !req.body.category ||
    !req.body.author_id
  ) {
    return res
      .status(400)
      .json({ message: "Um dos campos não foi preenchido corretamente" });
  }

  BookModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId });
  });
};

const update = (req, res) => {
  BookModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Livro atualizado" });
  });
};

const remove = (req, res) => {
  BookModel.remove(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Livro removido" });
  });
};

export { list, get, create, update, remove };
