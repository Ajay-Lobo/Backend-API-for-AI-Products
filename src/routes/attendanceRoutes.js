import express from "express";
import { attendanceController } from "../controllers/index.js";
const { recordAttendance, getAllAttendanceMetrics, updateAttendance } =
  attendanceController;
const router = express.Router();

router
  .post("/", recordAttendance)
  .get("/", getAllAttendanceMetrics)
  .put("/:id", updateAttendance);

export default router;
