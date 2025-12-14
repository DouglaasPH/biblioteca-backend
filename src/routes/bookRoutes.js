import express from "express";
import * as bookController from "../controllers/bookController.js";

const bookRoutes = express.Router();

bookRoutes.get("/", bookController.list);
bookRoutes.get("/:id", bookController.get);
bookRoutes.post("/", bookController.create);
bookRoutes.put("/:id", bookController.update);
bookRoutes.delete("/:id", bookController.remove);

export default bookRoutes;
