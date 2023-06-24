import dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config();
const PORT: number = Number(process.env.PORT) || 5000;

const app: Express = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
