import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import { restaurantRoute } from "./routes/restaurant.route";

dotenv.config();

const PORT: number = Number(process.env.APP_PORT) || 5000;

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use("/restaurants", restaurantRoute);

app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
