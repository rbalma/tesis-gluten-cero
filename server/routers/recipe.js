const express = require('express');
const recipeController = require('../controllers/recipe');

const api = express.Router();

const md_auth = require("../middleware/authenticated");

api.post("/recipes", [md_auth.ensureAuth], recipeController.subirArchivo, recipeController.newRecipe);
api.get("/recipes-titles", recipeController.getRecipesTitles);
api.get("/recipes/:id", recipeController.getRecipeById);
api.get("/recipes/user/:id", recipeController.getRecipesByUser);
api.get("/recipes/user-table/:id", recipeController.getRecipesByUserTable);
api.get("/recipes-active", recipeController.getRecipesActive);
api.put("/recipes/upload-image/:id", [md_auth.ensureAuth, recipeController.subirArchivo], recipeController.uploadImage);
api.get("/recipes/get-image/:imageName", recipeController.getImage);
api.put("/recipes/:id", [md_auth.ensureAuth, recipeController.subirArchivo], recipeController.updateRecipe);
api.put("/recipes/activate/:id", [md_auth.ensureAuth], recipeController.activateRecipe);
api.delete("/recipes/:id", [md_auth.ensureAuth], recipeController.deleteRecipe);
api.get("/recipes-active/filter/categories", recipeController.getRecipesFilterByCategories);



module.exports = api;