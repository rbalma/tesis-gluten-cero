import express from 'express';
import {
  addRecipes,
  getRecipesById,
  getRecipes,
  activateRecipe,
  updateRecipe,
  deleteRecipe,
  getLastRecipesSideBar,
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

export default router;
