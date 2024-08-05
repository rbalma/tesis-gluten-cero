import express from "express";
import {
  addRecipes,
  getRecipesById,
  getRecipes,
  changeStatusRecipe,
  getRejectedRecipeInfo,
  updateRecipe,
  deleteRecipe,
  getLastRecipesSideBar,
  getFavRecipes,
  addFavRecipe,
  deleteFavRecipe,
} from "../controllers/recipe.controller.js";
import { validateJWT } from "../middlewares/validateJwt.js";
import { uploadFile } from "../middlewares/UploadRecipe.js";

const router = express.Router();

router
  .route("/recipes")
  .get(getRecipes)
  .post([validateJWT, uploadFile], addRecipes);

router
  .route("/recipes/:recipeId")
  .get(getRecipesById)
  .put([validateJWT, uploadFile], updateRecipe)
  .delete(validateJWT, deleteRecipe)
  .patch(validateJWT, changeStatusRecipe);

router.get("/sidebar/recipes/:recipeId", getLastRecipesSideBar);

router
  .route("/favorites/recipes")
  .get(validateJWT, getFavRecipes)
  .patch(validateJWT, addFavRecipe);

router.delete("/favorites/recipes/:recipeId", validateJWT, deleteFavRecipe);

router.get("/rejected/recipes/:recipeId", validateJWT, getRejectedRecipeInfo);

export default router;
