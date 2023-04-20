import express, { Express, Request, Response } from "express";
import { client } from "../shared/dbConnect";

// Get recipes
const getRecipes = async (req: Request, res: Response) => {
  try {
    const data = await client.query(
      `
        SELECT * FROM recipes LIMIT 50
      `
    );

    res.json({
      success: true,
      message: "Fetched recipes successfully",
      recipes: data.rows,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to get recipes",
      error: error,
    });
  }
};

// Get recipe by id
const getRecipe = async (req: Request, res: Response) => {
  const recipeId = req.params.id;

  try {
    const data = await client.query(
      `
        SELECT * FROM recipes WHERE id = $1
      `,
      [recipeId]
    );

    res.json({
      success: true,
      message: "Fetched recipe successfully",
      recipes: data.rows,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to get recipe",
      error: error,
    });
  }
};

// Search recipes by name or ingredients
const searchRecipe = async (req: Request, res: Response) => {
  const { searchValue } = req.query;

  try {
    const data = await client.query(
      `
        SELECT * FROM recipes WHERE
        recipe_title ILIKE '%${searchValue}%'
        OR ARRAY_TO_STRING(recipe_ingredients, ',') ILIKE '%${searchValue}%'
        LIMIT 50
      `
    );

    res.json({
      success: true,
      message: "Fetched recipe successfully",
      recipes: data.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to search",
      error: error,
    });
  }
};

// Get a random recipe
const getRandomRecipe = async (req: Request, res: Response) => {
  try {
    const data = await client.query(
      `
        SELECT * FROM recipes ORDER BY RANDOM() LIMIT 1
      `
    );

    res.json({
      success: true,
      message: "Fetched recipe successfully",
      recipes: data.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to search",
      error: error,
    });
  }
};

// Add recipe
const addRecipe = async (req: Request, res: Response) => {
  const { title, ingredients, instructions, times, imageLink } = req.body;

  console.log(instructions);

  // Convert ingredients to a postgres array
  const separateIngredients: string[] = ingredients.trim().split(";");
  let newIngredientsList: string = "";
  for (let index = 0; index < separateIngredients.length; index++) {
    newIngredientsList +=
      index === separateIngredients.length - 1
        ? `"${separateIngredients[index]}"`
        : `"${separateIngredients[index]}",`;
  }
  newIngredientsList = `{${newIngredientsList}}`;
  //

  // Convert times to a postgres array
  const separateTimes: string[] = times.trim().split(";");
  let newTimesList: string = "";
  for (let index = 0; index < separateTimes.length; index++) {
    newTimesList +=
      index === separateTimes.length - 1
        ? `"${separateTimes[index]}"`
        : `"${separateTimes[index]}",`;
  }
  newTimesList = `{${newTimesList}}`;
  //

  try {
    await client.query(
      `
        INSERT INTO recipes 
        (recipe_title, recipe_ingredients, recipe_instructions, recipe_times, recipe_image_url)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [title, newIngredientsList, instructions, newTimesList, imageLink]
    );

    res.json({ success: true, message: "Added recipe successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to add recipe", error: error });
  }
};

// Update recipe
const updateRecipe = async (req: Request, res: Response) => {
  const { title, ingredients, instructions, times, imageLink, recipeId } =
    req.body;

  // Convert ingredients to a postgres array
  const separateIngredients: string[] = ingredients
    .replace(/ /g, "")
    .split(";");
  let newIngredientsList: string = "";
  for (let index = 0; index < separateIngredients.length; index++) {
    newIngredientsList +=
      index === separateIngredients.length - 1
        ? `"${separateIngredients[index]}"`
        : `"${separateIngredients[index]}",`;
  }
  newIngredientsList = `{${newIngredientsList}}`;
  //

  // Convert times to a postgres array
  const separateTimes: string[] = times.replace(/ /g, "").split(";");
  let newTimesList: string = "";
  for (let index = 0; index < separateTimes.length; index++) {
    newTimesList +=
      index === separateTimes.length - 1
        ? `"${separateTimes[index]}"`
        : `"${separateTimes[index]}",`;
  }
  newTimesList = `{${newTimesList}}`;
  //

  try {
    await client.query(
      `
        UPDATE recipes 
        SET (recipe_title, recipe_ingredients, recipe_instructions, recipe_times, recipe_image_url)
        = ($1, $2, $3, $4, $5)
        WHERE id = $6
      `,
      [title, newIngredientsList, instructions, newTimesList, imageLink, recipeId]
    );

    res.json({ success: true, message: "Updated recipe successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to update recipe",
      error: error,
    });
  }
};

// Delete recipe
const deleteRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.body;

  try {
    await client.query(
      `
        DELETE FROM recipes WHERE id = $1
      `,
      [recipeId]
    );

    res.json({
      success: true,
      message: "Deleted recipe successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to delete recipe",
      error: error,
    });
  }
};

export {
  getRecipes,
  getRecipe,
  searchRecipe,
  getRandomRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
