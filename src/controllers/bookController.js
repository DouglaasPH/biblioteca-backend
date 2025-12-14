import * as BookModel from "../models/bookModel.js";

const list = async (req, res) => {
  try {
    const result = await BookModel.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const get = async (req, res) => {
  try {
    const result = await BookModel.getById(req.params.id);
    if (!result) res.status(404).json({ message: "Livro não encontrado" });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req, res) => {
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

  try {
    await BookModel.create(req.body);
    res.status(201).json({ message: "Livro adicionado" });
  } catch (err) {
    if (err.errno == 1452)
      return res.status(404).json({
        message: "Autor não encontrado. Por favor, tente outro autor.",
      });
    res.status(500).json(err);
  }
};

const update = async (req, res) => {
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

  try {
    const affectedRows = await BookModel.update(req.params.id, req.body);
    if (affectedRows == 0)
      return res.status(404).json({ message: "Livro não encontrado" });
    res.json({ message: "Livro atualizado" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const remove = async (req, res) => {
  try {
    const affectedRows = await BookModel.remove(req.params.id);
    if (affectedRows == 0)
      return res.status(404).json({ message: "Livro não encontrado" });
    res.json({ message: "Livro deletado" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export { list, get, create, update, remove };
