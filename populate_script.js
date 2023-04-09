const pg = require("pg");
const dotenv = require("dotenv");
const data = require("./src/shared/recipes.json");

dotenv.config();

const client = new pg.Client({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("DB connected successfully");

    populateDB();
  } catch (error) {
    console.error("An error occurred while connecting to DB ", error);
  }
};

const populateDB = async () => {
  for (let index = 0; index < data.length; index++) {
    console.log("Populating recipe ", index);
    try {
      const title = data[index].title;
      const imageLink = data[index].image;

      // Construct ingredients
      let ingredientsList = "{";
      data[index].ingredients.forEach((ing) => {
        const tempIng = ing.replace(/"/g, "'");
        ingredientsList += `"${tempIng}",`;
      });
      ingredientsList = ingredientsList.slice(0, -1).concat("}");
      //

      // Construct instructions
      let instructionsList = "[";
      data[index].instructions.forEach((instruction) => {
        const tempIns = instruction.text.replace(/"/g, "'");
        instructionsList += `{"type": "HowToStep", "text": "${tempIns}"},`;
      });
      instructionsList = instructionsList.slice(0, -1).concat("]");
      //

      // Construct times
      let timesList = "";
      if (data[index].times.length > 0) {
        timesList = "{";
        data[index].times.forEach((time) => {
          timesList += `"${time}",`;
        });
        timesList = timesList.slice(0, -1).concat("}");
      } else {
        timesList = "{}";
      }
      //

      await client.query(
        `
          INSERT INTO recipes
          (recipe_title, recipe_ingredients, recipe_instructions, recipe_times, recipe_image_url)
          VALUES ($1, $2, $3, $4, $5)
        `,
        [title, ingredientsList, instructionsList, timesList, imageLink]
      );
    } catch (error) {
      console.log(error);
    }
  }
};

connectDB();
