const express = require('express');
const { addUsers, getUsers, getUserById, updateUser, deleteUser, getFavRecipes, addFavRecipe, deleteFavRecipe } = require('../controllers/user');

const { validateJWT } = require('../middlewares/validateJwt');
const { uploadFile } = require('../middlewares/uploadAvatar');

const router = express.Router();

router.route('/users')
        .post(addUsers)
        .get(validateJWT, getUsers);

router.route('/users/:id')
        .get(validateJWT, getUserById)
        .put(validateJWT, uploadFile, updateUser)
        .delete(validateJWT, deleteUser);

router.route('/fav-recipes/:userId')
        .get(validateJWT, getFavRecipes)
        .put(validateJWT, addFavRecipe)
        .delete(validateJWT, deleteFavRecipe);

module.exports = router;
