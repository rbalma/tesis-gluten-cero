import express from 'express';
import {
  addRecipes,
  getRecipesById,
  getRecipes,
  activateRecipe,
  updateRecipe,
  deleteRecipe,
  getLastRecipesSideBar,
  getFavRecipes,
  addFavRecipe,
  deleteFavRecipe
} from '../controllers/recipe.js';
import { validateJWT } from '../middlewares/validateJwt.js';
import { uploadFile } from '../middlewares/UploadRecipe.js';

const router = express.Router();

router.route('/recipes').get(getRecipes).post([validateJWT, uploadFile], addRecipes);
router
  .route('/recipes/:recipeId')
  .get(getRecipesById)
  .put([validateJWT, uploadFile], updateRecipe)
  .delete(validateJWT, deleteRecipe);
router.put('/active-recipe/:recipeId', validateJWT, activateRecipe);

router.get('/sidebar/recipes/:recipeId', getLastRecipesSideBar);

router.get('/favorites/recipes', validateJWT, getFavRecipes);

router
  .route('/favorites/recipes/:recipeId')
  .put(validateJWT, addFavRecipe)
  .delete(validateJWT, deleteFavRecipe);

export default router;
