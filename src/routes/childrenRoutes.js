import express from "express";
import { childrenController } from "../controllers/index.js";

const {
  createChild,
  getChildren,
  updateChild,
  deleteChild,
  getChildrenOverview,
} = childrenController;

const router = express.Router();

router
  .post("/", createChild)
  .get("/", getChildren)
  .put("/:id", updateChild)
  .delete("/:id", deleteChild)
  .get("/overview", getChildrenOverview);

export default router;
