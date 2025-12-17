import * as BookModel from "../models/bookModel.js";

const list = async (req, res) => {
  try {
    const result = await BookModel.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Erro interno",
      status_code: 500,
      error: err,
    });
  }
};

const get = async (req, res) => {
  try {
    const result = await BookModel.getById(req.params.id);
    if (!result) res.status(404).json({ message: "Livro não encontrado" });
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Erro interno",
      status_code: 500,
      error: err,
    });
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
      .json({
        message: "Um dos campos não foi preenchido corretamente",
        status_code: 400,
        error: {},
      });
  }

  try {
    await BookModel.create(req.body);
    res
      .status(201)
      .json({ message: "Livro adicionado", status_code: 201, error: {} });
  } catch (err) {
    if (err.errno == 1452)
      return res.status(404).json({
        message: "Autor não encontrado. Por favor, tente outro autor.",
        status_code: 404,
        error: err,
      });
    res.status(500).json({
      message: "Erro interno",
      status_code: 500,
      error: err,
    });
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
      .json({
        message: "Um dos campos não foi preenchido corretamente",
        status_code: 400,
        error: {},
      });
  }

  try {
    const affectedRows = await BookModel.update(req.params.id, req.body);
    if (affectedRows == 0)
      return res
        .status(404)
        .json({ message: "Livro não encontrado", status_code: 404, error: {} });
    res
      .status(200)
      .json({ message: "Livro atualizado", status_code: 200, error: {} });
  } catch (err) {
    res.status(500).json({
      message: "Erro interno",
      status_code: 500,
      error: err,
    });
  }
};

const remove = async (req, res) => {
  try {
    const affectedRows = await BookModel.remove(req.params.id);
    if (affectedRows == 0)
      return res
        .status(404)
        .json({ message: "Livro não encontrado", status_code: 404, error: {} });
    res.json({ message: "Livro deletado", status_code: "200", error: {} });
  } catch (err) {
    res.status(500).json({
      message: "Erro interno",
      status_code: 500,
      error: err,
    });
  }
};

export { list, get, create, update, remove };
