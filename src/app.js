import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import router from './routes/index.js';



const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/api', router);


export default app;