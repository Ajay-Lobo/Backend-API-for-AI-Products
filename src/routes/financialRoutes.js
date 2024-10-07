import express from "express";
import { financialController } from "../controllers/index.js";

const {
  createFinancialRecord,
  getFinancialRecords,
  updateFinancialRecord,
  deleteFinancialRecord,
  getFinancialOverview,
} = financialController;

const router = express.Router();

router
  .post("/", createFinancialRecord)
  .get("/", getFinancialRecords)
  .put("/:id", updateFinancialRecord)
  .delete("/:id", deleteFinancialRecord)
  .get("/overview", getFinancialOverview);

export default router;
