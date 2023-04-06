import express, { Express, Request, Response, Router } from "express";
import { addRecipe, getRecipes } from "../controllers/recipe";

const router: Router = express.Router();

router.get("/", getRecipes);

router.get("/:id", (req: Request, res: Response) => {
  const recipeId = req.params.id;

  res.json("Get one recipe");
});

router.post("/", addRecipe);

router.put("/:id", (req: Request, res: Response) => {
  const recipeId = req.params.id;

  res.json("Updated a recipe");
});

router.delete("/:id", (req: Request, res: Response) => {
  const recipeId = req.params.id;

  res.json("Deleted a recipe");
});

export default router;
