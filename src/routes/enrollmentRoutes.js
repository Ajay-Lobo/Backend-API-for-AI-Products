import express from "express";
import { enrollmentController } from "../controllers/index.js";

const { createEnrollment, getMonthlyEnrollments } = enrollmentController;
const router = express.Router();

router.post("/", createEnrollment).get("/monthly", getMonthlyEnrollments);

export default router;
