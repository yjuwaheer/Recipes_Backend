import express, { Express, Router } from "express";
import {
  addRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  searchRecipe,
  updateRecipe,
} from "../controllers/recipe";

const router: Router = express.Router();

router.get("/", getRecipes);

router.get("/search", searchRecipe);

router.get("/:id", getRecipe);

router.post("/", addRecipe);

router.put("/", updateRecipe);

router.delete("/", deleteRecipe);

export default router;
