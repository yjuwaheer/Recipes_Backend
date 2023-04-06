import express, { Express, Request, Response } from "express";
import { client } from "../shared/dbConnect";

// Get recipes
const getRecipes = async (req: Request, res: Response) => {
  try {
    const data = await client.query(
      `
        SELECT * FROM recipes 
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

// Add recipe
const addRecipe = async (req: Request, res: Response) => {
  const { name, description, ingredients, instructions, imageLink } = req.body;

  // Convert ingredients to a postgres array
  const separateIngredients: string[] = ingredients
    .replace(/ /g, "")
    .split(",");
  let newIngredientsList: string = "";
  for (let index = 0; index < separateIngredients.length; index++) {
    newIngredientsList +=
      index === separateIngredients.length - 1
        ? `"${separateIngredients[index]}"`
        : `"${separateIngredients[index]}",`;
  }
  newIngredientsList = `{${newIngredientsList}}`;
  //

  try {
    await client.query(
      `
        INSERT INTO recipes 
        (recipe_name, recipe_description , recipe_ingredients, recipe_instructions, recipe_image_url)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [name, description, newIngredientsList, instructions, imageLink]
    );

    res.json({ success: true, message: "Added recipe successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to add recipe", error: error });
  }
};

export { getRecipes, addRecipe };
