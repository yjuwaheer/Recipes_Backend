# About

Backend for Recipes app

### How run locally

- Clone repository
- Navigate to folder, run `npm install`
- Add `.env` file
  Format:
  ```
  DB_HOST=
  DB_PORT=
  DB_NAME=
  DB_USER=
  DB_PASSWORD=
  ```
- Start the server in dev using `npm run dev`

### Features

- Get all recipes
- Get a specific recipe by ID
- Add a recipe
- Update a recipe
- Delete a recipe
- Search recipes by name or ingredients

### To improve

- Add swagger
- Add testing
- Use an ORM
- Add Dockerfile