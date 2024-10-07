import express from "express";
import { verifyToken } from "../middleware/auth.js";

const protectedRouter = express.Router();

protectedRouter.use(verifyToken);

export default protectedRouter;
