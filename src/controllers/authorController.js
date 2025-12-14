import * as AuthorModel from "../models/authorModel.js";

const list = async (req, res) => {
  try {
    const results = await AuthorModel.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

const get = async (req, res) => {
  try {
    const result = await AuthorModel.getById(req.params.id);
    if (!result)
      return res.status(404).json({ message: "Autor não encontrado" });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req, res) => {
  if (!req.body.name || !req.body.nationality) {
    return res
      .status(400)
      .json({ message: "Um dos campos não foi preenchido corretamente" });
  }

  try {
    await AuthorModel.create(req.body);
    res.status(201).json({ message: "Autor adicionado" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const update = async (req, res) => {
  if (!req.body.name || !req.body.nationality) {
    return res
      .status(400)
      .json({ message: "Um dos campos não foi preenchido corretamente" });
  }

  try {
    const affectedRows = await AuthorModel.update(req.params.id, req.body);
    if (affectedRows == 0)
      return res.status(404).json({ message: "Autor não encontrado" });
    res.json({ message: "Autor atualizado" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const remove = async (req, res) => {
  try {
    const affectedRows = await AuthorModel.remove(req.params.id);
    if (affectedRows == 0)
      return res.status(404).json({ message: "Autor não encontrado" });
    res.json({ message: "Autor deletado" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export { list, get, create, update, remove };
