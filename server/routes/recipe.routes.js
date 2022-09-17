const express = require('express');
const recipeController = require('../controllers/recipe');
const { validateJWT } = require('../middlewares/validateJwt');

const api = express.Router();


api.post("/recipes", validateJWT, recipeController.subirArchivo, recipeController.newRecipe);
api.get("/recipes-titles", recipeController.getRecipesTitles);
api.get("/recipes/:id", recipeController.getRecipeById);
api.get("/recipes/user/:id", recipeController.getRecipesByUser);
api.get("/recipes/user-table/:id", recipeController.getRecipesByUserTable);
api.get("/recipes-active", recipeController.getRecipesActive);
api.put("/recipes/upload-image/:id", [validateJWT, recipeController.subirArchivo], recipeController.uploadImage);
api.get("/recipes/get-image/:imageName", recipeController.getImage);
api.put("/recipes/:id", [validateJWT, recipeController.subirArchivo], recipeController.updateRecipe);
api.put("/recipes/activate/:id", validateJWT, recipeController.activateRecipe);
api.delete("/recipes/:id", validateJWT, recipeController.deleteRecipe);
api.get("/recipes-active/filter/categories", recipeController.getRecipesFilterByCategories);



module.exports = api;