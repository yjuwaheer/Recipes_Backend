import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, initializeDB } from "./shared/dbConnect";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Routers
import recipeRouter from "./routes/recipes";

try {
  connectDB();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("Server running");
  });
  app.use("/recipes", recipeRouter);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("An error occurred during initialization ", error);
}
