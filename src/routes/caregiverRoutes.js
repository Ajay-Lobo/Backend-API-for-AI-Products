import express from "express";
import { caregiverController } from "../controllers/index.js";

const {
  createCaregiver,
  getCaregivers,
  updateCaregiver,
  deleteCaregiver,
  getCaregiverOverview,
} = caregiverController;

const router = express.Router();

router
  .post("/", createCaregiver)
  .get("/", getCaregivers)
  .put("/:id", updateCaregiver)
  .delete("/:id", deleteCaregiver)
  .get("/overview", getCaregiverOverview);

export default router;
