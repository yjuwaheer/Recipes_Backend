import express, { Express, Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json("Get all recipes");
});

router.get("/:id", (req: Request, res: Response) => {
  const recipeId = req.params.id;

  res.json("Get one recipe");
});

router.post("/", (req: Request, res: Response) => {
  res.json("Added a recipes");
});

router.put("/:id", (req: Request, res: Response) => {
  const recipeId = req.params.id;

  res.json("Updated a recipe");
});

router.delete("/:id", (req: Request, res: Response) => {
  const recipeId = req.params.id;

  res.json("Deleted a recipe");
});

export default router;
