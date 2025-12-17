import * as AuthorModel from "../models/authorModel.js";

const list = async (req, res) => {
  try {
    const results = await AuthorModel.getAll();
    res.json(results);
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
    const result = await AuthorModel.getById(req.params.id);
    if (!result) return [];
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
  if (!req.body.name || !req.body.nationality) {
    return res.status(400).json({
      message: "Um dos campos não foi preenchido corretamente",
      status_code: 400,
      error: {},
    });
  }

  try {
    await AuthorModel.create(req.body);
    res
      .status(201)
      .json({ message: "Autor adicionado", status_code: 201, error: {} });
  } catch (err) {
    res.status(500).json({
      message: "Erro interno",
      status_code: 500,
      error: err,
    });
  }
};

const update = async (req, res) => {
  if (!req.body.name || !req.body.nationality) {
    return res.status(400).json({
      message: "Um dos campos não foi preenchido corretamente",
      status_code: 400,
      error: {},
    });
  }

  try {
    const affectedRows = await AuthorModel.update(req.params.id, req.body);
    if (affectedRows == 0)
      return res
        .status(404)
        .json({ message: "Autor não encontrado", status_code: 404, error: {} });
    res
      .status(200)
      .json({ message: "Autor atualizado", status_code: 200, error: {} });
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
    const affectedRows = await AuthorModel.remove(req.params.id);
    if (affectedRows == 0)
      return res.status(404).json({
        message: "Autor não encontrado",
        status_code: 404,
        error: {},
      });
    res
      .status(200)
      .json({ message: "Autor deletado", status_code: "200", error: {} });
  } catch (err) {
    res.status(500).json({
      message: "Erro interno",
      status_code: 500,
      error: err,
    });
  }
};

export { list, get, create, update, remove };
