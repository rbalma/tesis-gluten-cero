import express from 'express';
import {
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
} from '../controllers/user.js';

import { validateJWT } from '../middlewares/validateJwt.js';
import { uploadFile } from '../middlewares/uploadAvatar.js';

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

export default router;
