import express from "express";
import { userController } from "../controllers/index.js";

const { register, login } = userController;

const router = express.Router();

router.post("/register", register).post("/login", login);

export default router;
