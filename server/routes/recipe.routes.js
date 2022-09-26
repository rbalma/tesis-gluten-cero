const express = require('express');
const {
  addRecipes,
  getRecipesById,
  getRecipes,
  activateRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipe');
const { validateJWT } = require('../middlewares/validateJwt');
const { uploadFile } = require('../middlewares/UploadRecipe');

const router = express.Router();

router.route('/recipes').get(getRecipes).post([validateJWT, uploadFile], addRecipes);
router
  .route('/recipes/:recipeId')
  .get(getRecipesById)
  .put([validateJWT, uploadFile], updateRecipe)
  .delete(validateJWT, deleteRecipe);
router.put('/active-recipe/:recipeId', validateJWT, activateRecipe);

module.exports = router;
