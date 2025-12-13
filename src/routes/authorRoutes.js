import express from "express";
import * as authorController from "../controllers/authorController";

const router = express.Router();

router.get("/", authorController.list);
router.get("/:id", authorController.get);
router.post("/", authorController.create);
router.put("/:id", authorController.update);
router.delete("/:id", authorController.remove);

export default router;
