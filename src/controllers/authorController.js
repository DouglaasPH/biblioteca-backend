import * as AuthorModel from "../models/authorModel.js";

const list = (req, res) => {
  AuthorModel.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const get = (req, res) => {
  AuthorModel.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

const create = (req, res) => {
  if (!req.body.name || !req.body.nationality) {
    return res
      .status(400)
      .json({ message: "Um dos campos não foi preenchido corretamente" });
  }

  AuthorModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId });
  });
};

const update = (req, res) => {
  AuthorModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Autor atualizado" });
  });
};

const remove = (req, res) => {
  AuthorModel.remove(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Autor removido" });
  });
};

export { list, get, create, update, remove };
