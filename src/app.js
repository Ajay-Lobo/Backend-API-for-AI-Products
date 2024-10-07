import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);

export default app;