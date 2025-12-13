import express from "express";
import * as authorController from "../controllers/authorController.js";

const authorRoutes = express.Router();

authorRoutes.get("/", authorController.list);
authorRoutes.get("/:id", authorController.get);
authorRoutes.post("/", authorController.create);
authorRoutes.put("/:id", authorController.update);
authorRoutes.delete("/:id", authorController.remove);

export default authorRoutes;
