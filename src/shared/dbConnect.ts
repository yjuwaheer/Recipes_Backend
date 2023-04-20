import pg, { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
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

    initializeDB();
  } catch (error) {
    console.error("An error occurred while connecting to DB ", error);
  }
};

const initializeDB = async () => {
  console.log("Initializing DB");

  try {
    const query = await client.query(
      `
        CREATE TABLE IF NOT EXISTS recipes (
          id                    SERIAL PRIMARY KEY,
          recipe_title          VARCHAR(100) NOT NULL,
          recipe_ingredients    TEXT [] NOT NULL,
          recipe_instructions   JSONB NOT NULL,
          recipe_times          TEXT [],
          recipe_image_url      VARCHAR(250)
        )
      `
    );
  } catch (error) {
    console.error("An error occurred while initializing DB ", error);
  }
};

export { connectDB, initializeDB, client };
