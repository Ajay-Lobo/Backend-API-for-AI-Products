import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

export default app;