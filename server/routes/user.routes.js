const express = require('express');
const {
  addUsers,
  activeUserAccount,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getFavRecipes,
  addFavRecipe,
  deleteFavRecipe,
  getFavMarkets,
  addFavMarkets,
  deleteFavMarkets,
} = require('../controllers/user');

const { validateJWT } = require('../middlewares/validateJwt');
const { uploadFile } = require('../middlewares/uploadAvatar');

const router = express.Router();

router.route('/users').post(addUsers).get(validateJWT, getUsers);

router
  .route('/users/:id')
  .get(validateJWT, getUserById)
  .put(validateJWT, uploadFile, updateUser)
  .delete(validateJWT, deleteUser);

router.route('/active-account/:userId').put(activeUserAccount);

router
  .route('/fav-recipes/:userId')
  .get(validateJWT, getFavRecipes)
  .put(validateJWT, addFavRecipe)
  .delete(validateJWT, deleteFavRecipe);

router
  .route('/fav-markets/:userId')
  .get(validateJWT, getFavMarkets)
  .put(validateJWT, addFavMarkets)
  .delete(validateJWT, deleteFavMarkets);

module.exports = router;
