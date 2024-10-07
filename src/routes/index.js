import express from "express";
import userRouter from "./userRoutes.js";
import financeRouter from "./financialRoutes.js";
import enrollmentRouter from "./enrollmentRoutes.js";
import childrenRouter from "./childrenRoutes.js";
import caregiverRouter from "./caregiverRoutes.js";
import attendanceRouter from "./attendanceRoutes.js";
import protectedRouter from "./protectedRoutes.js";

const router = express.Router();

router
  .use("/users", userRouter)
  .use("/finance", protectedRouter, financeRouter)
  .use("/enrollments", protectedRouter, enrollmentRouter)
  .use("/children", protectedRouter, childrenRouter)
  .use("/caregivers", protectedRouter, caregiverRouter)
  .use("/attendance", protectedRouter, attendanceRouter);

export default router;
